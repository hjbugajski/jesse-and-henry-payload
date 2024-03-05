# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [9.2.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v9.1.0...v9.2.0) (2024-03-05)

### Features

- add RSVP deadline ([d4c71fc](https://github.com/hjbugajski/jesse-and-henry-payload/commit/d4c71fc34bbd2812f1f0e686aa68af30ea219ae8))
- **collections/Guests:** add meal preference ([a0e13b3](https://github.com/hjbugajski/jesse-and-henry-payload/commit/a0e13b3bc3a78f18ff3523b7bd8a2d968ac891cd))

## [9.1.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v9.0.0...v9.1.0) (2024-02-13)

### Features

- **blocks:** add Faq ([a65309a](https://github.com/hjbugajski/jesse-and-henry-payload/commit/a65309ad4b63f17eef65fbcb87825c5ac96053e5))
- **collections:** add Faqs ([3ae44a3](https://github.com/hjbugajski/jesse-and-henry-payload/commit/3ae44a334c69eccb04d7de1a5cdd1302d8dcc61f))

### Bug Fixes

- **fields/link:** add tempUrl as workaround for broken releationship field ([c5e9c3c](https://github.com/hjbugajski/jesse-and-henry-payload/commit/c5e9c3ca3a33d22fa11a20b8517920fd736c9cd4))

## [9.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v8.1.0...v9.0.0) (2024-01-25)

### ⚠ BREAKING CHANGES

- unlock dependencies, replace slate with lexical, refactor pages and blocks

### refactor

- unlock dependencies, replace slate with lexical, refactor pages and blocks ([a8f64da](https://github.com/hjbugajski/jesse-and-henry-payload/commit/a8f64da1f1de5eca3dcc3fc88c5b476da69d1547))

### Features

- **globals/Navigation:** add call to action ([277c3ae](https://github.com/hjbugajski/jesse-and-henry-payload/commit/277c3aea9cd8062478a83eb2489b9f4602972310))

### Bug Fixes

- **collections/Media:** remove video mime type, update image sizes, update dataUrl max length ([35370e8](https://github.com/hjbugajski/jesse-and-henry-payload/commit/35370e8080f0c1dc9d3a9fc24798ab2246535e50))

## [8.1.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v8.0.0...v8.1.0) (2024-01-23)

### Features

- **collections/Guests:** add fields for rsvp ([8369ecb](https://github.com/hjbugajski/jesse-and-henry-payload/commit/8369ecbae05cc4fb83dcf01b0acc39b670384fe2))

### Bug Fixes

- **collections/Guests:** fix small issues ([a0d6975](https://github.com/hjbugajski/jesse-and-henry-payload/commit/a0d6975e00efff9179b22f46dbb14433ca6a34ef))
- **hooks/useDataUrl:** prevent infinite loop ([4364ed1](https://github.com/hjbugajski/jesse-and-henry-payload/commit/4364ed1ef81b0df3be2838b11f7678bb80e27dfc))

## [8.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v7.0.1...v8.0.0) (2023-12-24)

### ⚠ BREAKING CHANGES

- **collection/Guests:** update rsvp fields, update afterChange party logic

### Features

- **custom/GuestList:** add party code to data grid ([232c53f](https://github.com/hjbugajski/jesse-and-henry-payload/commit/232c53fb67cbf67dcbf260d62deac3589c5e11bc))
- **fields:** add registry ([8498ebe](https://github.com/hjbugajski/jesse-and-henry-payload/commit/8498ebe3427cc711966dbf7fff02e7ea6adaa393))

### Bug Fixes

- **collection/Guests:** update rsvp fields, update afterChange party logic ([f5aabd4](https://github.com/hjbugajski/jesse-and-henry-payload/commit/f5aabd4532f365907b26f4a4dee401cb70c413ab))
- **collection/Media:** refactor usDataUrl to afterChange hook ([14e3655](https://github.com/hjbugajski/jesse-and-henry-payload/commit/14e36552e6e9d8a267f453efa94259abd134d810))

## [7.0.1](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v7.0.0...v7.0.1) (2023-11-22)

### Bug Fixes

- **collections/Parties:** change code from letters to numbers ([f6666d3](https://github.com/hjbugajski/jesse-and-henry-payload/commit/f6666d3755706042aba7de8ad7983f2f2c0dd39c))
- **components/CodeCell:** remove code formatting ([3057a07](https://github.com/hjbugajski/jesse-and-henry-payload/commit/3057a077c2dc6ce145bc64cbe47dea9620e64ec8))
- **custom/GuestList:** reorder columns ([848206c](https://github.com/hjbugajski/jesse-and-henry-payload/commit/848206c71ccddb8ba2f8acf78a45e931f3fb9d22))

## [7.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v6.0.0...v7.0.0) (2023-10-26)

### Features

- add Media collection, switch to npm, update Docker ([97dacad](https://github.com/hjbugajski/jesse-and-henry-payload/commit/97dacad71f3e5054d425c119e457cbed37fdd4f7))
- **blocks/ButtonLinks:** refactor ButtonLink to ButtonLinks with an array of links ([5bdd925](https://github.com/hjbugajski/jesse-and-henry-payload/commit/5bdd925a518156b1e1d2ee63d22ee3521ff26226))
- **blocks/Hero:** add image field ([ba47398](https://github.com/hjbugajski/jesse-and-henry-payload/commit/ba473989062b2a03137e532e92dfaeb8f2bb5683))
- **blocks:** add Photos ([6ca1f99](https://github.com/hjbugajski/jesse-and-henry-payload/commit/6ca1f998c61829ea45693d115dbd6a76a4023175))
- migrate to payload v2 ([f6b1414](https://github.com/hjbugajski/jesse-and-henry-payload/commit/f6b1414ff0702a7b7dd6e32631d8938899bf813c))

### Bug Fixes

- **blocks/Section:** change border field to checkbox ([39b3d4b](https://github.com/hjbugajski/jesse-and-henry-payload/commit/39b3d4bc47de0e59fb3891f2fd33499829343720))

## [6.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v5.0.0...v6.0.0) (2023-10-19)

### ⚠ BREAKING CHANGES

- **fields/link:** rename reference to relationship, add anchor, rel fields
- **globals:** rename NavMenu to Navigation

### refactor

- **globals:** rename NavMenu to Navigation ([5e371b9](https://github.com/hjbugajski/jesse-and-henry-payload/commit/5e371b97ef519e834debc294b657fdace26e4448))

### Features

- add interface names ([1df71ae](https://github.com/hjbugajski/jesse-and-henry-payload/commit/1df71aec81d27015714e1d2844aac63acb0d4366))
- **fields/link:** rename reference to relationship, add anchor, rel fields ([c4fa650](https://github.com/hjbugajski/jesse-and-henry-payload/commit/c4fa6505ff7f59666e93b1813ea51f3cce939d27))

### Build

- **deps:** bump postcss from 8.4.30 to 8.4.31 ([dd73b04](https://github.com/hjbugajski/jesse-and-henry-payload/commit/dd73b04113e6090894c2a22a627b3a15c7ae4e09))

## [5.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v4.0.0...v5.0.0) (2023-09-28)

### ⚠ BREAKING CHANGES

- **blocks/Section:** rename id to anchorId as to not override generated id
- **blocks/ButtonLink:** remove icon field in favor of icon field in link
- **blocks/Alert:** make action link optional
- **collections:** remove ProtectedPages in favor of access controls on Pages

### Bug Fixes

- **blocks/Alert:** make action link optional ([6f0ffb6](https://github.com/hjbugajski/jesse-and-henry-payload/commit/6f0ffb60031d2d06811fb6902629494021bf330f))
- **blocks/ButtonLink:** remove icon field in favor of icon field in link ([750e5c2](https://github.com/hjbugajski/jesse-and-henry-payload/commit/750e5c27394cfc7ab4dd37a4e3655ca08bd76fcb))
- **blocks/Section:** rename id to anchorId as to not override generated id ([6f1bb06](https://github.com/hjbugajski/jesse-and-henry-payload/commit/6f1bb06f323ef9e3ec12cb8425aa66a29777dc23))
- **collections:** remove ProtectedPages in favor of access controls on Pages ([81107a1](https://github.com/hjbugajski/jesse-and-henry-payload/commit/81107a1960e12716a6572849e3582379f54440ff))
- **fields/width:** add default value ([03c6cfc](https://github.com/hjbugajski/jesse-and-henry-payload/commit/03c6cfc4991bb820ec8d27caa5a661bd22e58e1f))

## [4.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v3.1.1...v4.0.0) (2023-09-27)

### Features

- **access:** add isAuthed ([a81669a](https://github.com/hjbugajski/jesse-and-henry-payload/commit/a81669a67fd02a7fa35742313f553588a305db81))
- add Alert block ([f62161a](https://github.com/hjbugajski/jesse-and-henry-payload/commit/f62161a863b8caca6fbd5fb3cedff311e03b87f2))
- add ProtectedPages collection ([97acc23](https://github.com/hjbugajski/jesse-and-henry-payload/commit/97acc2310f1bfd60bc4e50bf3ad9dcb899404d73))
- **fields:** add color, width, and richText/venue ([e444246](https://github.com/hjbugajski/jesse-and-henry-payload/commit/e4442465a08772c16f8f2e2247f375f4fce8bdad))
- generate graphql schema ([5f0102f](https://github.com/hjbugajski/jesse-and-henry-payload/commit/5f0102f7968935f5dcc6a3cdfdc9a851e8e0cfc2))
- update and add fields to blocks, update link ([c4761da](https://github.com/hjbugajski/jesse-and-henry-payload/commit/c4761da3c2f9a256ac9b24ce54695cbc9cdc478e))

## [3.1.1](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v3.1.0...v3.1.1) (2023-09-26)

## [3.1.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v3.0.0...v3.1.0) (2023-08-30)

### Features

- **blocks/Content:** add width field ([da1ddab](https://github.com/hjbugajski/jesse-and-henry-payload/commit/da1ddabc0403e4dc967fe0661e7493a401bd259d))
- **blocks:** add ButtonLink ([13924f4](https://github.com/hjbugajski/jesse-and-henry-payload/commit/13924f4880cd0ec3970b281ff4b6d0bccb3832b4))
- **blocks:** add Section ([fabb62d](https://github.com/hjbugajski/jesse-and-henry-payload/commit/fabb62d685807758260d72e322267fc03c95d66a))
- **fields:** add link ([0b4d633](https://github.com/hjbugajski/jesse-and-henry-payload/commit/0b4d633516932c18828b36436c930014b290efef))
- **globals:** add NavMenu ([39b92bd](https://github.com/hjbugajski/jesse-and-henry-payload/commit/39b92bd30cb025bd316d3bedc4a3739a1a8fde14))

## [3.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.4.2...v3.0.0) (2023-08-16)

### ⚠ BREAKING CHANGES

- rename HeroTitle to Hero

### refactor

- rename HeroTitle to Hero ([843c829](https://github.com/hjbugajski/jesse-and-henry-payload/commit/843c829efd104cd8bd01e6fc023a6a17fd6cc702))

## [2.4.2](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.4.1...v2.4.2) (2023-08-10)

## [2.4.1](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.4.0...v2.4.1) (2023-07-15)

## [2.4.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.3.1...v2.4.0) (2023-06-13)

### Features

- **collections/Guests:** update guest password on party change ([0572b9c](https://github.com/hjbugajski/jesse-and-henry-payload/commit/0572b9ce2585ce791378c6f576c41209713dcc56))
- **collections:** add versions for Guests and Parties ([931fa37](https://github.com/hjbugajski/jesse-and-henry-payload/commit/931fa3785ad23486d2adb776b11a45891e46786f))
- **custom/GuestList:** reorder initial column layout, allow column reorder, highlight cell on hover ([dab5034](https://github.com/hjbugajski/jesse-and-henry-payload/commit/dab5034747d1b07d21611ed5824a538e3e246898))

### Bug Fixes

- **dependencies:** revert payload version to fix password reset issue ([07da094](https://github.com/hjbugajski/jesse-and-henry-payload/commit/07da09443e6204aa62d11d40f354f83fa61f0634))

## [2.3.1](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.3.0...v2.3.1) (2023-06-11)

### Bug Fixes

- **collections/Guests:** update email generation logic ([acd2394](https://github.com/hjbugajski/jesse-and-henry-payload/commit/acd2394be0423347ea37a86361b6dc15bea5a345))

## [2.3.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.2.1...v2.3.0) (2023-06-10)

### Features

- **collection/Guests:** auto update email based on first, middle, and last name ([02e30e6](https://github.com/hjbugajski/jesse-and-henry-payload/commit/02e30e6e6af40264d2294aefa711903fd5da6d24))
- **collections/Guests:** limit access to admin, self, or party ([47ff99c](https://github.com/hjbugajski/jesse-and-henry-payload/commit/47ff99c41425faa7275b70253b370e94af8d3e12))
- **components/GuestList:** add color grouping by party ([0b5d793](https://github.com/hjbugajski/jesse-and-henry-payload/commit/0b5d7934a0a792728ba3d0a856527ef6d7c5a117))

### Bug Fixes

- **collections/Parties:** add limit to local API ([df1a963](https://github.com/hjbugajski/jesse-and-henry-payload/commit/df1a963d5e619501cc7a2454140f5bca7c8b43fd))

## [2.2.1](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.2.0...v2.2.1) (2023-06-01)

### Bug Fixes

- **components/GuestList:** prevent cell editing from completing with shift+enter ([2a54a04](https://github.com/hjbugajski/jesse-and-henry-payload/commit/2a54a04df9b319562e95d06958c3c8c995650f8e))
- **Guests/GuestList:** properly set sort index and reorder documents ([1401464](https://github.com/hjbugajski/jesse-and-henry-payload/commit/1401464a16607b3cbecc7cd65afdf572b0d2b084))

## [2.2.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.1.0...v2.2.0) (2023-05-31)

### Features

- **components/GuestList:** add ability to insert guest after/before any row ([9cea44b](https://github.com/hjbugajski/jesse-and-henry-payload/commit/9cea44bf2a10ed15680b2afec7b14e2354820d14))
- **components:** add TextareaEditor ([7c00c8a](https://github.com/hjbugajski/jesse-and-henry-payload/commit/7c00c8a8a15da97d5f1249670425ca3286d250bf))

### Bug Fixes

- **collections/Guests:** update reorder functionality ([39882ec](https://github.com/hjbugajski/jesse-and-henry-payload/commit/39882ec9da820d8d35ac4d72dd607ea4406dbaa5))
- **styles:** update variables, fix small issues ([bae5033](https://github.com/hjbugajski/jesse-and-henry-payload/commit/bae5033932e9bc5db45cb2f3c527779dc83ff4a5))

## [2.1.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v2.0.0...v2.1.0) (2023-05-25)

### Features

- **components:** add EditMany, add DeleteMany, update GuestList ([b400411](https://github.com/hjbugajski/jesse-and-henry-payload/commit/b400411eda715b9a66ce02ef97e4cb94208e5d1f))
- **config:** add PAYLOAD_DOMAIN to csrf ([c29616e](https://github.com/hjbugajski/jesse-and-henry-payload/commit/c29616e18240e0aca15c38e1c6f2fc2c71b6264c))

### Bug Fixes

- **collections:** update admin config ([57126c2](https://github.com/hjbugajski/jesse-and-henry-payload/commit/57126c2c25d8fe042cabe25044d116175d4770ae))
- **styles:** remove height ([04e2802](https://github.com/hjbugajski/jesse-and-henry-payload/commit/04e28020f7f0f72134865dc5e14602f980ba9897))

## [2.0.0](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v1.0.1...v2.0.0) (2023-05-24)

### Features

- **collections/Guests:** add custom data grid ([f028936](https://github.com/hjbugajski/jesse-and-henry-payload/commit/f028936ecc7390a4395ddc804d3d0b243a94ec72))
- **collections/User:** add roles field ([af32336](https://github.com/hjbugajski/jesse-and-henry-payload/commit/af323364767b589edd3de4ce7617afb1466022b3))
- **collections:** add Guests, Parties, Relations, Sides, Tags ([4b70f85](https://github.com/hjbugajski/jesse-and-henry-payload/commit/4b70f851a7c4372ac58dcb868ee49d9b58a2cc81))
- **config:** add csrf and serverUrl ([fd37c7c](https://github.com/hjbugajski/jesse-and-henry-payload/commit/fd37c7c969128534bf98bfefc995a8737d515390))
- **config:** add custom styles ([72d074d](https://github.com/hjbugajski/jesse-and-henry-payload/commit/72d074d193d22aef82cebb5c2c39c2acff60191c))

## [1.0.1](https://github.com/hjbugajski/jesse-and-henry-payload/compare/v1.0.0...v1.0.1) (2023-05-18)

### Bug Fixes

- update access controls ([15f8607](https://github.com/hjbugajski/jesse-and-henry-payload/commit/15f8607821324ecb998700a5f973d7cdcb5771f4))

## 1.0.0 (2023-05-01)

### Features

- **access:** add access functions ([26918ce](https://github.com/hjbugajski/jesse-and-henry-payload/commit/26918ce3ad9ac67752de7a12006ebbad68747854))
- **blocks:** add Content ([dcf09ca](https://github.com/hjbugajski/jesse-and-henry-payload/commit/dcf09ca96c2141f5a8e64e0748e4589cb4eebfd8))
- **blocks:** add HeroTitle ([3e2df16](https://github.com/hjbugajski/jesse-and-henry-payload/commit/3e2df16ef902bc8b6c26093788f419a380d38270))
- **collections:** add Pages ([224fb8d](https://github.com/hjbugajski/jesse-and-henry-payload/commit/224fb8dc65679edca41564ffff120e7a17715612))
- **collections:** update User ([f796bec](https://github.com/hjbugajski/jesse-and-henry-payload/commit/f796bec40bdb1421733aeec36c65d3be7b4c5d0b))
- create project using create-payload-app ([564b938](https://github.com/hjbugajski/jesse-and-henry-payload/commit/564b93865ae3f118f06be0f475a4e530a3fe5527))
- generate payload types ([6ca2a84](https://github.com/hjbugajski/jesse-and-henry-payload/commit/6ca2a8488ffb291f337f2ff34492423a1ebe5ff4))
- **hooks:** add useSlug ([189cf07](https://github.com/hjbugajski/jesse-and-henry-payload/commit/189cf078c389badcd8f0c29d1f5f267b53773e96))
