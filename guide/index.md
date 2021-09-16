# Начало работы

## Обзор

Vite (с французского "быстрый", произносится `/вит/`) - это инструмент сборки, созданный для обеспечения быстрого и бережливого (lean) процесса разработки современных веб-проектов. Он состоит из двух основных частей:

- Dev сервер, который предоставляет более [расширенный функционал](./features), чем [нативные ES модули](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), для примера, невероятно быстрый [Hot Module Replacement (HMR)](./features#hot-module-replacement).

- Команда сборки, которая связывает ваш код с [Rollup](https://rollupjs.org), предварительно настроенным для вывода высоко оптимизированных статичных ресурсов (assets) для production.

Vite самодостаточный и имеет практичные настройки по умолчанию прямо из коробки, но он также может очень гибко настраиваться и расширять свой функционал через его [Plugin API](./api-plugin) и [JavaScript API](./api-javascript) с полной поддержкой типов.

Вы можете узнать больше о причинах этого в разделе [Почему Vite](./why).

## Browser Support (Поддержка бразуерами)

- Сборка по умолчанию нацелена на браузеры, которые поддерживают и [нативные ESM через script tag](https://caniuse.com/es6-module) и [нативный ESM dynamic import](https://caniuse.com/es6-module-dynamic-import). Для поддержки устаревших браузеров воспользуйтесь официальным плагином [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) - смотрите раздел [Сборка для Production](./build) для детального ознакомления.

## Быстрое развёртывание вашего Vite проекта (scaffolding)

:::tip примечание о совместимости
Vite требует обязательным [Node.js](https://nodejs.org/en/) версии >=12.0.0.
:::

NPM:

```bash
$ npm init vite@latest
```

Yarn:

```bash
$ yarn create vite
```

PNPM:

```bash
$ pnpm dlx create-vite
```

Потом следуйте инструкциям!

Вы можете также прямо указать название проекта и шаблон, который вы хотите использовать через дополнительные опции командной строки. Например, чтобы развернуть Vite + Vue проект, выполните следующую команду:

```bash
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, дополнительное двойное тире обязательно:
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue
```

Поддерживаемые пред установки шаблонов включают:

- `vanilla`(чистый JS)
- `vanilla-ts` (TypeScript и ничего больше)
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `preact`
- `preact-ts`
- `lit-element`
- `lit-element-ts`
- `svelte`
- `svelte-ts`

Смотрите раздел [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) для более детального ознакомления с каждым шаблоном.

## Community Templates (Шаблоны Сообщества)

create-vite - это инструмент для быстрого старта проекта из основного шаблона для популярных фреймворков. Смотрите Awesome Vite, чтобы найти [шаблон поддерживаемый сообществом](https://github.com/vitejs/awesome-vite#templates), который включает в себя другие нужные вам инструменты или нацелен на использование других фреймворков. Вы можете использовать такой инструмент как [degit](https://github.com/Rich-Harris/degit) чтобы развернуть свой проект с одним из шаблонов.

```bash
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

Если проект использует по умолчанию ветку `main`, добавьте суффикс `#main` к репозиторию проекта

```bash
npx degit user/project#main my-project
```

## `index.html` и корень проекта

Вы должно быть уже заметили что в проекте Vite, файл `index.html` является центральным файлом, а не спрятанным внутри папки `public`. Это сделано намеренно: во время разработки Vite является сервером, а `index.html` - это точка входа (entry point) в ваше приложение.

Vite рассматривает `index.html` как исходный код и как часть графа модуля. Vite обрабатывает строчку `<script type="module" src="...">`, которая ссылается на ваш исходный JavaScript код. Даже встроенный `<script type="module">` и CSS, на который есть ссылка `<link href>` также обладают специфичными для Vite фичами. В дополнение, URL адреса внутри `index.html` автоматически преобразуются в нужный формат, поэтому нет необходимости использовать специальный заполнитель (placeholder) `%PUBLIC_URL%`.

Подобно статическим http серверам, Vite имеет концепцию корневого каталога "root directory", из которого сёрвятся ваши файлы (обрабатываются сервером). Далее в документации для этого корневого каталога применяется обозначение `<root>`. Абсолютные URL адреса в вашем исходном коде будут обработаны (резолвнуты) используя корневой каталог как основу (base), поэтому Вы можете писать код так, как будто вы работаете с обычным статическим файловым сервером (но более мощным!). Vite также способен управлять зависимостями, которые резолвятся вне корневой директории файловой системы, что делает его пригодным для использования даже в монорепах.

Vite также поддерживает [multi-page apps](./build#multi-page-app) с многими `.html` точками входа (entry points).

#### Указание альтернативного корневого каталога (рута, root)

Запуск `vite` поднимает dev сервер используя текущую рабочую директорию как рутовую (root). Вы можете указать альтернативный рут с помощью команды: `vite serve some/sub/dir`.

## Command Line Interface (Интерфейс Командной Строки)

В проекте где установлен Vite, вы можете использовать `vite` бинарник прямо в ваших npm скриптах, или запускать это напрямую с помощью команды `npx vite`. Дефолтные npm скрипты в развёрнутом Vite проекте:

```json
{
  "scripts": {
    "dev": "vite", // запускает dev server
    "build": "vite build", // (build) сборка для production
    "serve": "vite preview" // локальная preview production build
  }
}
```

Вы можете указать дополнительные CLI опции такие как `--port` или `--https`. Чтобы посмотреть полный список CLI опций, выполните команду `npx vite --help` в вашем проекте.

## Использование Невыпущенных Коммитов (Unreleased Commits)

Если вы не можете дождаться новых релизов последних фич, то вам нужно склонить [vite repo](https://github.com/vitejs/vite) на свой локальный компьютер и затем собрать проект и пролинковать его с помощью Yarn ([Yarn 1.x](https://classic.yarnpkg.com/lang/en/) обязателен):

```bash
git clone https://github.com/vitejs/vite.git
cd vite
yarn
cd packages/vite
yarn build
yarn link
```

Затем нужно перейти в ваше Vite проект и выполнить команду `yarn link vite`. Теперь перезапустите дев сервер (`yarn dev`) чтобы быть впереди планеты всей!

## Сообщество

Если у Вас есть какие-то вопросы или Вам нужна помощь, обращайтесь к нашему сообществу в [Discord](https://discord.gg/4cmKdMfpU5) и [GitHub Discussions](https://github.com/vitejs/vite/discussions).