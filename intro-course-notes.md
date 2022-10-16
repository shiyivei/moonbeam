# 第一课

## 1 Moonbeam是什么？

完全兼容以太坊的工具链、dApps和协议

跨链资产和基础设施集合

统一标准化账户和私钥格式（H160）

以太坊工具链完全兼容

Solidity智能合约可组合性

## 2 什么是Substrate和polkadot

Substrate底层实现基于Rust，中上层实现基于Javascript

运行时使用WASM，底层通讯使用libp2p

基础功能是一个个Rust模块集成的Pallet，包括投票、质押、共识（AURA、BABE几种不同的算法）等

polkadot是中继链，提供共享安全和消息传递

平行链自行签署区块，提供给中继续链最终确定

平行线程，类似于平行链，但是每个插入中继链的区块要竞拍

Moonbeam：拥有收集人节点，负责交易和签署区块，也有自定义的经济模式（链上治理经济模式和激励架构），Substrate互操作性（跨链交易其他平行链等）

Moonbeam 有三个网络：主网、先行网和测试网

## 3 Moonbeam对EVM的高度兼容性

Substrate FRAME Pallets提供了构建区块链所需的底层功能

Moonbeam对以太坊的兼容性依赖于两个Pallet，一个是Pallet EVM（由Rust实现的以太坊虚拟机，可以让Substrate区块链执行无需更改的任何Solidity代码），Frontier提供状态转换映射以及区块封装服务

Frontier 是web3 RPC和Substrate之间的中间件

以太坊工具 - Frontier RPC插件（前端对接以太坊工具，然后将这些方法映射到Substrate运行时） - pallet ethereum (模拟区块处理、tx、日志、调度程序存储到EVM的后端) - Pallet EVM 和 Rust EVM （构建EVM运行环境）

## 4 Moonbeam统一标准化账户实现

Substrate 地址格式：ss58

eth 地址格式: H160 

Moonbeam 将substrate底层的地址格式改为了与以太坊兼容的地址格式

