# 1 Moonbeam

## 1.1 什么是moonbeam

波卡上兼容以太坊的智能合约平行链

1. 基于Substrate构建，连接波卡以实现本地互操作性

2. Web3RPC支持，无缝的ETH JSON-RPC集成

3. 统一账户，以太坊格式账户

4. 开发工具和集成、

## 1.2 什么是波卡

基于substrate搭建的异构多链主网

1. 中继链（layer 0）：提供共享安全性和消息传递
2. 平行链：（layer 1）：独立运行的区块链，并提供给中继链最中确定
3. XCM 跨共识通信格式，允许平行链之间的跨链交互和转账

## 1.3 什么是XCM

1. 跨共识信息格式，通用语言定义
2. 可延伸性，向前向后兼容
3. 轻量而高效，支持多链异构，底层基于XCVM语言

## 1.4 XCM 的使用场景

### 1.4.1 XC-20 跨链资产

定义新的资产标准：XC-20跨链资产

这些资产既可以跨链跨链和交易,也可以轻松集成到Moonbeam EVM生态中

### 1.4.2 智能合约远程调用：Lido

1. 用户在Moonriver上将xcKSM存入Lido在Moonriver上的智能合约
2. Lido通过XCM Transactor Pallet 远程调用KSM中继链上的派生账户，再通过派生账户将存放在Moonriver上的xcKSM质押到KSM中继链上
3. 质押到KSM中继链之后，Lido会给用户在Moonriver上发行stKSM（Liquid KSM），它是一种流动性代币，可以积累质押奖励，也可以随时交易

## 1.5 什么是预编译

1. 一段预先编译的代码或者智能合约

2. 最初被以太坊使用，用于常用的加密和哈希算法，如SHA256，RIPEMD56、Keccak256等

3. 一种substrate原语，是构建跨链交互和Substrate pallet交互的重要组成部分

4. Moonbeam的预编译逻辑的执行在本地节点的Substrate运行时中执行，执行完后的结果会返回给evm预编译接口的调用者

5. 目前Moonbeam已经有超过7种的预编译

https://appbhteffsi3308.h5.xiaoeknow.com/p/course/video/v_6336a8efe4b0a51fef22ee46?product_id=p_628cc809e4b0cedf38b63788

## 1.6 课程安排

1. 导入课：主要介绍Moonbeam和波卡
2. XCM模块： XCM原理介绍和xTokens Pallet
3. 预编译模块：批量处理预编译、VRF预编译和许可预编译

# 2 XCM介绍和原理 

## 2.1 XCM 技术概述

1. 跨共识的信息格式：通用语言定义（像编程语言一样）

2. 可延伸性：无主观性 （不会强迫开发者按照某种固定的格式）

3. 向前向后兼容性

4. 轻量而高效，支持多链异构，底层基于XCVM语言(底层实现通过一个特定的vm来执行特定的指令)

## 2.2 XCM 信息如何传递

1. XCM可以想象成一种传输协议，可以传输资产，也可以传输信息，可以类比TCP/IP和UDP
2. 信息传递方式的种类：VMP 垂直信息传递，中继链到平行链；XCMP 平行链到平行链；HRMP功能和接口同前者，所有信息都需要存储在中继链，链上资源消耗高（临时解决方案）

## 2.3 XCM频道概述

1. 频道单方向，双向通信需要打开两个
2. 与中继链之间的通道在连接中继链时默认打开
3. 发起和接受请求都需要从root用户发出，可以通过治理和Sudo
4. 两条链之间最多有两个频道，一个发送信息，一个接收信息

## 2.4 XCM 频道注册

1. 注册频道信息格式，（parachain ID,max-capacity,max-message-size）
2. 购买中继链执行时间（注册频道需要在中继链执行，所以需要购买中继链的执行时间）
3. 频道注册需要绑定一定的KSM或者DOT，20DOT or KSM 10,可以使用KSMchainstate.configuration.activeConfig来查询
4. 注册流程：某条链发起注册请求，目的链接受请求
5. HRMP可视化工具：https://dotsama-channels.vercel.app/#/

## 2.5 XCM频道信息查询

1. 关于注册的查询

KSMchainstate.configuration.activeConfig

```
configuration.activeConfig: PolkadotRuntimeParachainsConfigurationHostConfiguration
{
  --
  hrmpSenderDeposit: 5,000,000,000,000
  hrmpRecipientDeposit: 5,000,000,000,000
  hrmpChannelMaxCapacity: 1,000
  hrmpChannelMaxTotalSize: 102,400
  --
}
```

2. 查看所有链的请求

KSM chainstate.hrmp.hrmpOpenChannelRequestsList()

```
[
  {
    sender: 2,085 // 请求链的ID
    recipient: 2,084 //接收链的ID
  }
 --
]
```

3. 查看平行链ID

```
https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.api.onfinality.io%2Fpublic-ws#/parachains
```

## 2.6 交易费用的计算

可以使用任何双方平行链都接受的资产作为交易费用

1. 购买执行时间（Holding1 register拥有此资产 & 目标链接受此资产）
2. 多种付费策略（直接收原声代币；接收指定的非原生代币；接收非原生代币，但是转为原生代币；不接受原生代币）

## 2.7 XCM操作指令

每个操作指令都有相应的重量（执行成本，类似以太坊的gas）

1. WithdrawAsset：将资产转入Holding Register
2. DepositAsset: 从Holding Register移出资产
3. TransferAsset：将资产转移给某一位受益人
4. Transact：尝试在链上调用某个方法
5. BuyExecution：使用Holding Register内的资金购买执行时间
6. SubscribeVersion：要求更改目标链支持的XCM版本

## 2.8 主权账户

1. 平行链拥有的账户（在另外一条链上）
2. 持有正在发送的资金（类似于以太坊的锁定合约）
3. 地址由确定性算法生成 （衍生于Parachain ID: 哈希平行链ID，然后拼凑在其他特定字符串中）
4. 如何计算主权账户的（使用如下脚本文件计算，提供两个参数 parachain ID和 中继链name（polkadot/kusama/moonbase)

moonbeam/advanced-courses/xcmTools

```
ts-node calculateSovereignAddress.ts --paraid 2023 --relay kusama/polkadot/moonbase(三个中继链算出来的是一样的，不受中继链的影响)
```

```
2022-10-29 09:23:52        API/INIT: RPC methods not decorated: mmr_generateBatchProof
Sovereign Account Address on Relay: 0x70617261e7070000000000000000000000000000000000000000000000000000
Sovereign Account Address on other Parachains (Generic): 0x7369626ce7070000000000000000000000000000000000000000000000000000
Sovereign Account Address on Moonbase Alpha: 0x7369626ce7070000000000000000000000000000
```

## 2.9 Moonbeam XC-20 标准

### 2.9.1 XC-20资产

1. 是moonbeam的以太坊兼容解决方案

2. 这些资产既可以跨链跨链和交易,也可以轻松集成到Moonbeam EVM生态中

3. 查看现有的xc-20资产

https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmoonbeam.public.blastapi.io#/assets

https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwss.api.moonriver.moonbeam.network#/assets

### 2.9.2 可铸造的XC-20资产

1. 使用Substrate Assets pallet铸造，实在moonbeam本地铸造的资产
2. 通过EVM管理，可以与智能合约直接交互
3. 可以轻松跨链交易

## 2.10 XC-20资产的代表方式

### 2.10.1 代表方式1:Multilocations

一种在波卡生态代表“位置”的方法

1. 类似文件存储的路径系统（采用相对路径命名方式；本地资产或者账户不用穿越“parents”或中继链；其他链上的账户和资产则需要）
2. 资产,账户和平行链都可以用Multilocation来代表
3. 因为是相对路径，所以需要考虑调用的起源点是哪里
4. Multilocation：数据结构

```
组成部分：parents 和 interior
parents = 0 或 1，代表是否要跨越中继链
interior 代表定义目标位置；X_代表几个字段，X1代表1个字段，X2代表2个字段
```

![image-20221029100843180](/Users/qinjianquan/Library/Application Support/typora-user-images/image-20221029100843180.png)

### 2.10.2 资产代表方式2:资产ID （Asset ID）

1. 也称Currency ID
2. 10 进制数字
3. SelfReserve 指本地原生代币（mover等）
4. ForeignAsset指XC-20的资产ID
5. 可以从Multilocation计算（计算资产ID）
6. 可以在polkadot.js apps钱包的asset下查看

### 2.10.3 资产代表方式3:XC-20预编译合约地址

1. 从Multilocation 和资产ID计算

```
address = "0xFFFFFFF..." + DecimalToHex(AssetId)
```

2. 以太坊合约地址格式
3. 代表一个X-20资产的ERC-20预编译地址

## 2.11 计算资产ID和XC-20预编译地址

moonbeam/advanced-courses/xcmTools

1. 从moonbeam到平行链ID2007的PalletInstance 3

表示方式1: Multilocation

```
{"parents":1,"interior":{"X2":[{"Parachain":2007},{"PalletInstance":3}]}}
```

表示方式2&3: 资产ID和预编译合约地址（需要计算利用Multilocation计算，计算时有两个参数，1是起源地如moonbeam，2是mutilocation定义）

```
ts-node calculateMultilocationInfo.ts --n 'moonbeam' --a '{"parents":1,"interior":{"X2":[{"Parachain":2007},{"PalletInstance":3}]}}'
```

```
2022-10-29 10:34:13        API/INIT: RPC methods not decorated: eth_feeHistory, eth_maxPriorityFeePerGas, moon_isBlockFinalized, moon_isTxFinalized
Storage Key 0x1da53b775b270400e7e61ed5cbc5a146ea70f53d5a3306ce02aaf97049cf181a70e256f880a1a59a7df53ce93aa980d1ffffffff393d731822b042dcf547635f1a4d0524 //subtrate存储资产的内存地址
Asset Address Precompile: 0xffffffff393d731822b042dcf547635f1a4d0524
Asset ID is 76085060257426726555623896097844167972
```

2. 从平行链到中继链的原生代币（interior = "Here" = [] = null）

表示方式1: Multilocation

```
{"parents":1}
```

表示方式2&3: 资产ID和预编译合约地址（需要计算利用Multilocation计算，计算时有两个参数，1是起源地如moonbeam，2是mutilocation定义）

```
ts-node calculateMultilocationInfo.ts --n 'moonbeam' --a '{"parents":1}'
```

```
2022-10-29 10:50:25        API/INIT: RPC methods not decorated: eth_feeHistory, eth_maxPriorityFeePerGas, moon_isBlockFinalized, moon_isTxFinalized
Storage Key 0x1da53b775b270400e7e61ed5cbc5a146ea70f53d5a3306ce02aaf97049cf181a1f720ca3a567a7892f51ba4eabe649ccffffffff1fcacbd218edc0eba20fc2308c778080
Asset Address Precompile: 0xffffffff1fcacbd218edc0eba20fc2308c778080
Asset ID is 42259045809535163221576417993425387648
```

## 2.12 XCM转账流程

### 2.12.1 XCM转账机制

1. 传送（在第一条链上现焚毁资产，然后在第二条链上再铸造）要求两条链完全信任
2. 远程转账 （起源链锁定资产，然后再目标链上铸造，然后在起源链焚毁，再解锁，由主权账户完成）

### 2.12.2 从中继链向平行链转账

先在中继链上将资产转到其在中继链上的主权账户，主权账户锁定该笔资产，同时发送XCM信息给平行链，要求平行链铸造相等数额的xc资产并将其转给平行链上的目标账户，然后再发送信息给中继链上的主权账户发送已经铸造完毕信息，主权账户焚毁中继链上锁定的资产

### 2.12.3 平行链向平行链转账

先在平行链上将资产转到目标平行链在中继链上的主权账户，主权账户锁定该笔资产，目标平行链铸造相等数额的xc资产并将其转给平行链上的目标账户，目标平行链主权账户焚毁中继链上锁定起源平行链的资产

{"parents":1}

{"parents":1,"interior":{"X2":[{"Moonriver":2023},{"PalletInstance":10}]}}

2. HRMP 功能和街口与XCMP一样，但是HRMP信息存放在中继链上，对存储资源消耗很高，是临时解决方案

3. 1. 持有正在发送的资金
   2. 地址由确定性算法生成 （parachain ID + relaychain name）

4. 1. 资产、账户和平行链
   2. 相对的

5. 1. parents 代表是否需要跨越中继链，值为0 或者 1
   2. interior 代表定义目标位置，X_代表需要几个字段，如X1代表需要一个字段，X2代表需要两个字段

6. a. {"parents":1}; 

   b. {"parents":1,"interior":{"X1":{"Parachain":2000}}}

   c. 好难

7. a. {"parents":0}; 

​		b. {"parents":0,"interior":{"X2":[{"Parachain":2023},{"PalletInstance": 10}]}}

​		c. 好难

8. 1. Asset ID is 12967387043518906634230669212739216153

   2. Asset Address Precompile: 0xffffffff09c16d8ae76e29ea269f2b5333d8a319

9. 1.  本地的原生代币
   2. Interior = “Here” = [] = null

10. 1. 传送和远程转账
    2. 传送：采用焚毁（原生链）- 铸造（目标链），要求两条链完全信任；远程转账：锁定 - 铸造/焚毁- 解锁
    3. 由于在生产环境中无法保证两条链完全信任，一般使用远程转账这种方式

# 3 xTokens Pallet和预编译

## 3.1 xTokens Pallet 概述

是Open-Runtime-Module-Library（ORML）的一部分，由Acala团队研发，是一个由社区维护的库

xToken Pallet能够简化XCM代币转账

计算UNIT/XCUNIT 资产ID和Moonbase Alpha预编译地址

预编译主要的目的是为了在Moonbeam EVM中直接调用xTokens pallet

xTokens数据结构

# 4 批处理预编译

预编译：预先编译的代码或智能合约

## 4.1 批处理预编译

三种执行模式

## 4.2 批处理转账

## 4.3 作业答案

### 第1题

1. batchAll：任何子调用执行失败，所有子调用都将回滚状态
2. batchSome：如果某一个子调用回滚状态，仍将尝试执行其余子调用
3. batchSomeUntilFailure：如果某一子调用回滚状态，则不会尝试执行后续子调用

## 第2题

因为ERC-20标准合约中要求需要先被approve一定的额度，才能调用send_tokens发送代币

# 5 随机数预编译

VRF原理：可验证随机函数,是一种伪随机函数

Moonbeam随机数pallet生产随机数，消费者需要请求提供随机数的智能合约

使用：

继承

# 6 许可预编译

许可预编译：当前系统时间小于或者等于许可截止时间
