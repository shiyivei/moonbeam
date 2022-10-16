# 1 Moonbeam

1. 什么是moonbeam？

与以太坊完全兼容，H160钱包地址

具有substrate特性和波卡生态安全性

2. 什么是波卡？

基于substrate框架的波卡平行链

XCM：跨共识通信格式

3. 重要概念

3.1 XCM

类似swit，可以定义资产，支持智能合约的远程调用

3.1 预编译

一段预先编译好的代码，如SHA256

# 2 XCM介绍和原理 

## XCM 技术概述

跨共识的信息格式：通用语言定义

可延伸性：无主观性

向前向后兼容性：

轻量而高效

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

# Moonbeam 入门课

1. Moonbeam高度兼容以太坊

以太坊工具链、Dapp、协议

2. 波卡



