# 1 Moonbeam概述

## 1.1 Moonbeam是什么？

完全兼容以太坊的工具链、dApps和协议

跨链资产和基础设施集合

统一标准化账户和私钥格式（H160）

以太坊工具链完全兼容

Solidity智能合约可组合性

## 1.2 什么是Substrate和polkadot

Substrate底层实现基于Rust，中上层实现基于Javascript

运行时使用WASM，底层通讯使用libp2p

基础功能是一个个Rust模块集成的Pallet，包括投票、质押、共识（AURA、BABE几种不同的算法）等

polkadot是中继链，提供共享安全和消息传递

平行链自行签署区块，提供给中继续链最终确定

平行线程，类似于平行链，但是每个插入中继链的区块要竞拍

Moonbeam：拥有收集人节点，负责交易和签署区块，也有自定义的经济模式（链上治理经济模式和激励架构），Substrate互操作性（跨链交易其他平行链等）

Moonbeam 有三个网络：主网、先行网和测试网

## 1.3 Moonbeam对EVM的高度兼容性

Substrate FRAME Pallets提供了构建区块链所需的底层功能

Moonbeam对以太坊的兼容性依赖于两个Pallet，一个是Pallet EVM（由Rust实现的以太坊虚拟机，可以让Substrate区块链执行无需更改的任何Solidity代码），Frontier提供状态转换映射以及区块封装服务

Frontier 是web3 RPC和Substrate之间的中间件

以太坊工具 - Frontier RPC插件（前端对接以太坊工具，然后将这些方法映射到Substrate运行时） - pallet ethereum (模拟区块处理、tx、日志、调度程序存储到EVM的后端) - Pallet EVM 和 Rust EVM （构建EVM运行环境）

## 1.4 Moonbeam统一标准化账户实现

Substrate 地址格式：ss58

eth 地址格式: H160 

Moonbeam 将substrate底层的地址格式改为了与以太坊兼容的地址格式

## 1.5 moonbeam 网络与metamask wallet

Moonbase Alpha

MetaMask

链接测试网

https://docs.moonbeam.network/cn/

获取测试币

```
https://apps.moonbeam.network/moonbase-alpha/faucet/
```

# 2 Remix IDE

## 2.1 Remix 和 ERC-721标准

Remix IDE：支持插件OpenZeppelin，Oraclize，Solium等，也开源

智能合约：在区块链上可以执行代码或协议，后面希望能够使用wasm支持更多的语言写智能合约，智能合约具有可组合性

ERC-721标准：NFT，2018年1月引进，用途：CryptoKitties，用途：除了NFT收藏品，也有像ENS这样的用途

## 2.2 Remix部署

正常操作即可，不同的网络选择不同的端点即可

## 2.3 测试和使用区块链浏览器

铸造erc721

## 2.4 Chainlink 介绍和喂价演示

**预言机**

抽象电脑，回答决定性的问题，为智能合约提供链下信息服务

解决区块链网络没有直接途径来获取链外信息的问题

chainlink：为各种Defi智能合约喂价

**喂价基本原理**

预言机节点像Aggregator合约发布价格数据，获得奖励

Aggregator合约从预言机网络定期接收最新数据更新，并将数据存储上链

终端用户通过Aggregator接口或通过代理合约的Consumer接口使用只读操作检索喂价

**喂价合约**

0x3669da30c33D27A6A579548fCfc345fE5dEdda6e ETH 

# 3 Hardhat

## 3.1 介绍和安装Hardhat

是一个编译、部署和测试Solidity智能合约和应用的开发环境

自带一个本地EVM虚拟机运行环境-Hardhat Network，类似于Ganache

基于Javascript,也支持Typescript

支持各种插件，包括Etherscan,Waffle插件，Ganache插件等

**开始一个hardhat项目**

```
mkdir hardhat && cd hardhat
npm init -y
npm install hardhat // 它本质上是一个node.js库
npx hardhat //选择创建空的config.js
npm install @nomiclabs/hardhat-ethers ethers //方便部署合约
npm install @openzeppelin/contracts //安装合约库依赖
```

## 3.2 部署和交互ERC-20合约

2015/11由ERP-20提议

```
在hardhat目录下创建两个文件夹
mkdir contracts //存放合约文件
mkdir scripts //存放部署脚本
```

脚本和合约文件具体见repo

```
hardhat.config 配置这里面的
```

编译合约

```
npx hardhat compile
```

部署合约

```
npx hardhat run --network moonbase scripts/deploy.js
```

使用控制台交互

```
npx hardhat console --network moonbase //它其实是启动了一个node.js环境
```

```
const MyToken = await ethers.getContractFactory('MyToken'); // 创建一个实例
const mytoken = await MyToken.attach('0x8C58248e82D705Bf8b08C027eAa8FF3Acd940c1b'); //通过地址去查具体合约
console.log(mytoken); //打印合约信息
```

简单的尝试交互一下,使用实例.方法的形式去调用合约方法

```;
await mytoken.name();
await mytoken.transfer('0x3aCaAB9fE5b1FCEf389963E12B9B3D014cc3610A',1000000)
await mytoken.balanceOf('0x3aCaAB9fE5b1FCEf389963E12B9B3D014cc3610A')
```

# 4 web3.js

## 4.1 web3.js介绍

是一个以太坊Javascript库

由以太坊基金会出资研发和维护，是最早也是最广使用的ETH API库

可以与Moonbeam交互，moonbeam完全兼容以太坊RPC

由几个模块组成：

详情参见repo

创建项目

```
cd web3example && cd web3example
npm init -y
```

安装依赖

```
npm install web3 
```

发送交易，见transaction.js

## 4.2 部署合约

安装solidity编译器依赖

```
npm install solc@0.8.0
```

编写智能合约

部署等等（操作过程大体相似）

## 4.3 读取和写入数据

创建新文件get.js编写脚本读取数据

# 5 Delegation DAO（上）

## 5.1 Moonbeam 共识

**Moonbeam 共识**

使用基于PoS的混合共识

平行链手机交易和产生区块

Nimbus从收集人有效集为每个区块筛选有效作者

随后区块会提交到波卡中继链提交并进行最终确定

**Moonbeam质押**

两个角色：候选收集人和委托人

活跃收集人集的评判标准：总绑定量 = 自身绑定量 + 总委托数量。选前64位

每个候选收集人最多能有300位有效委托人

候选收集人通过运行收集人节点获得委托数

**委托和撤销**

委托撤销在同一段时间内只能有一个

**什么是预编译**

一段预编译的代码或者智能合约

最初被以太坊所使用，用于常用的加密和哈希算法，如SHA256、RIPEMD56、Keccak256等

一种Substrate源语，是构建跨链交互和与Substrate pallet交互的重要组成部分

**Moonbeam拥有的预编译**

Parachain Staking

Pallet Democracy

XCM Transactor

xTokens

Author Mapping

Assets-ERC-20

等等

## 5.2 Staking 预编译

parachainStaking 是substrate 的一个pallet ，Solidity智能合约接口StakingInterface，它两一一映射，就是说通过这种方式我们写个智能合约就可以和moonbeam pallet交互了。虽然可以直接与Moonbeam进行交互，但是合约的方式更加灵活。这个接口在substrate runtime中运行，结果会返回给调用者（智能合约）

**质押预编译交互**

获得合约接口

https://docs.moonbeam.network/cn/builders/pallets-precompiles/precompiles/staking/	

0x0000000000000000000000000000000000000800

通过delete函数质押

## 5.3 DelegationDAO概念和设计

The DAO 最有名，直接导致了以太坊硬分叉

**DelegationDAO的要求**

Delegation DAO的成员可以将其Token充值到DAO智能合约

DAO会将总质押池委托给预先选定的候选收集人节点

成员可以从DAO提取他们的质押的Token并分享质押池中一定比例的质押奖励

DAO基于状态而设计

# 6 Delegation DAO（下）

