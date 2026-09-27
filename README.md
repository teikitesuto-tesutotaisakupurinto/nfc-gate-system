# 肩叩き定期券システム

## 概要

FeliCa Lite-Sカードを利用した
サービス利用・定期券管理システム。


## 構成

- Redmi Note 9T
  - NFCカード読み取り

- Firebase
  - データ管理

- Chromebook
  - 窓口端末
  - サービス利用端末


## 機能

### 窓口端末

- カード登録
- サービス登録
- 定期券発行
- 更新
- カード停止
- スタッフ管理


### サービス利用端末

- カード確認
- サービス選択
- 定期券利用
- 回数券利用
- 利用履歴保存


## Firebase

使用:

- Authentication
- Firestore
- Hosting


## カード

FeliCa Lite-S

管理:

カードIDm
↓
Firebase
↓
契約情報
