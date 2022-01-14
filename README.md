## ①SSG + Pre-fetch
変化しないページに向いており高速
事前に静的なページを作成した場合のテストを確認

## ②SSG + Client side fetching
常に最新の値が欲しいSEO対策が不要なダッシューボード等に向いている
動的に値を取得してくる（javascript無効で表示されなくなる）


``const { data: comments, error } = useSWR('commentsFetch', axiosFetcher)``

* 第1引数：キーのため好きな名前
* 第2引数：フェッチングの処理
* const1：名前定義（自由）
* const2：エラーの場合trueが返却

## ③グローバルのステート管理時のテスト

## ④SSG + Pre-fetch + Client side fetching
ビルド時に静的なページを作成し＆
アクセス時に動的に値を取得してくる（useSWRを使用）
このタイプは2段階のテストが必要
1.getStatic
2.useSWR:staticTasksにダミーのデータを

## Deploy on Vercel

### GitHub

1. VScodeからソース管理→メッセージ→チェックマーク押下
2. git remote add origin https://github.com/{user}/{repo}.git
3. git push -u origin main

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 自動テスト実施方法

1. VercelのからProject→Dashboard→setting
2. General→Build & Development Settings→Build Command
3. 「npm test && npm run build」記入してSave
