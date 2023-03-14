# pick posts

**_this repository is archived and merged to [kfs214/chigusa-iro](https://github.com/kfs214/chigusa-iro)_**

- [pick posts](#pick-posts)
  - [purpose](#purpose)
  - [requirements](#requirements)
  - [how to deploy](#how-to-deploy)
  - [how to use](#how-to-use)
    - [command](#command)
      - [push](#push)
      - [open gas console](#open-gas-console)
  - [Script Properties](#script-properties)
    - [Property Types](#property-types)
  - [note](#note)

## purpose

pick post(s) from wordpress\
post(s) to be sent as an e-mail

## requirements

[CHIgusa-iro app](https://github.com/kfs214/chigusa-iro) must be hosted as API to pick posts from WPAPI.

## how to deploy

1. npm install

```sh
npm install
```

2. install clasp globally (or use `npx` everytime)

```sh
npm install -g @google/clasp
```

3. log in to Google

```sh
clasp login
```

4. push & open

push code and open console by following `how to use` > `command`

## how to use

### command

#### push

```sh
npm run push
```

#### open gas console

```sh
npm run open
```

## Script Properties

some variables are set as Script Properties.\
[Manage script properties manually](https://developers.google.com/apps-script/guides/properties#manage_script_properties_manually)

### Property Types

| property    | description                                                                                                           | example                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| address     | e-mail address sent to                                                                                                | your.email@addre.ss                       |
| apiEndpoint | endpoint to your [CHIgusa-iro app](https://github.com/kfs214/chigusa-iro)                                             | https://your.domain/foo.bar.buz/random    |
| wpEndpoint  | base path to your wpapi                                                                                               | https://your.domain/wp-json               |
| categories  | get posts in catetories. values must be space separated. without this option, filtering by categories to be disabled. | 1 2 5                                     |
| postLimit   | maximum posts to be picked                                                                                            | 3                                         |
| subject     | subject set to e-mails                                                                                                | fantastic posts recommendation!           |
| heading     | this string will be placed before posts information                                                                   | These are recommended posts of this week! |
| footer      | this string will be placed after posts information                                                                    | This is scheduled everyweek!              |

## note

As the maximum posts per request is limited to 100 by WordPress API,  
`max length of picked posts` set to `100` even if `>100` entered.
