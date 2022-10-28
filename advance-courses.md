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

1. 注册频道信息格式

## XC - 20 标准

## 资产代表方式

## 转账流程

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
