import{o as e,c as r,d as t}from"./app.877e1a61.js";const o='{"title":"Сравнение с другими No-Bundler решениями","description":"","frontmatter":{},"headers":[{"level":2,"title":"Snowpack","slug":"snowpack"},{"level":2,"title":"WMR","slug":"wmr"},{"level":2,"title":"@web/dev-server","slug":"web-dev-server"}],"relativePath":"guide/comparisons.md","lastUpdated":1631746947278}',a={},n=[t('<h1 id="сравнение-с-другими-no-bundler-решениями" tabindex="-1">Сравнение с другими No-Bundler решениями <a class="header-anchor" href="#сравнение-с-другими-no-bundler-решениями" aria-hidden="true">#</a></h1><h2 id="snowpack" tabindex="-1">Snowpack <a class="header-anchor" href="#snowpack" aria-hidden="true">#</a></h2><p><a href="https://www.snowpack.dev/" target="_blank" rel="noopener noreferrer">Snowpack</a> - это также no-bundle нативный ESM dev server, который очень похож на Vite. Несмотря на различия в деталях реализаций, оба проекта имеют технические преимущества по сравнению с традиционными инструментами. Vite&#39;s dependency pre-bundling также вдохновлён Snowpack v1 (сейчас <a href="https://github.com/snowpackjs/snowpack/tree/main/esinstall" target="_blank" rel="noopener noreferrer"><code>esinstall</code></a>). Некоторые из главных различий в этих проектах:</p><p><strong>Production Build</strong></p><p>Output в Snopack по умолчанию не собран, разделён (unbundled): он трансформирует каждый файл в разный build модуль, который потом может быть загружен в различные &quot;optimizers&quot;, которые уже выполняют само объединение (bundling). Преимущество такого подхода заключается в том, что вы можете выбрать решение между разными end-bundler&#39;ами для ваших специфичных нужд (например, webpack, Rollup или даже esbuild). Недостаток в том, что это немного фрагментированный опыт - например, esbuild optimizer всё ещё нестабильный, Rollup optimizer официально не поддерживается, а другие оптимайзеры имеют различный output и конфигурации.</p><p>Vite нацелен на более глубокую интеграцию с одним бандлером (Rollup), чтобы обеспечить более упрощённый опыт. Это также позволяет Vite&#39;у поддерживать <a href="./api-plugin.html">Universal Plugin API</a> которые работают и для dev и для build.</p><p>Благодаря более интегрированному процессу сборки, Vite поддерживает широкий спектр функционала, который сейчас не доступен в Snowpack build оптимайзерах:</p><ul><li><a href="./build.html#multi-page-app">Multi-Page Support</a></li><li><a href="./build.html#library-mode">Library Mode</a></li><li><a href="./features.html#css-code-splitting">Automatic CSS code-splitting</a></li><li><a href="./features.html#async-chunk-loading-optimization">Optimized async chunk loading</a></li><li>Официальный <a href="https://github.com/vitejs/vite/tree/main/packages/plugin-legacy" target="_blank" rel="noopener noreferrer">legacy mode plugin</a>, который генерирует два modern/legacy бандла и автоматически поставляет необходимый бандл, основываясь на поддержке браузера пользователя.</li></ul><p><strong>Dependency Pre-Bundling быстрее</strong></p><p>Vite использует <a href="https://esbuild.github.io/" target="_blank" rel="noopener noreferrer">esbuild</a> вместо Rollup для dependency pre-bundling (сборки зависимостей). Это приводит к значительному повышению производительности с точки зрения холодного запуска сервера и пересборке (re-building) при невалидных зависимостей (dependency invalidations).</p><p><strong>Поддержка Monorepo</strong></p><p>Vite разработан с поддержкой monorepo setups и пользователи уже активно используют его с Yarn, Yarn 2, и PNPM based monorepos.</p><p><strong>Поддержка CSS Pre-Processor</strong></p><p>Vite обеспечивает более совершенную поддержку Sass и Less, включая улучшенный <code>@import</code> resolution (алиасы &quot;псевдонимы&quot; и npm зависимости) и <a href="./features.html#import-inlining-and-rebasing">автоматические преобразование <code>url()</code> для инлайновых файлов</a>.</p><p><strong>Первоклассная поддержка Vue</strong></p><p>Первоначально Vite был создан, чтобы служить в качестве будущей основы <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">Vue.js</a> инструментария. Хотя начиная с версии 2.0 Vite сейчас полностью независим от используемого фреймворка &quot;framework-agnostic&quot;, официальный плагин Vue всё ещё предоставляет первоклассную поддержку формата Vue&#39;s Single File Component, охватывая все продвинутые функции, такие как template asset reference resolving, <code>&lt;script setup&gt;</code>, <code>&lt;style module&gt;</code>, custom blocks и даже больше. В дополнение, Vite предоставляет детализированный HMR для Vue SFCs. Например, обновление <code>&lt;template&gt;</code> или <code>&lt;style&gt;</code> в SFC выполнит hot updates без сброса состояния приложения.</p><h2 id="wmr" tabindex="-1">WMR <a class="header-anchor" href="#wmr" aria-hidden="true">#</a></h2><p><a href="https://github.com/preactjs/wmr" target="_blank" rel="noopener noreferrer">WMR</a> от команды Preact предоставляет похожий набор функционала, и поддержка интерфейса плагинов Rollup в Vite 2.0 вдохновлена именно им (WMR).</p><p>WMR в основном разработан для <a href="https://preactjs.com/" target="_blank" rel="noopener noreferrer">Preact</a> проектов, и предлагает больше интегрированных фич, таких, как pre-rendering. В наших условиях, это скорее можно назвать Preact meta фреймворк, с акцентом на компактный размер, на чём акцентируется и сам Preact. Если вы используете Preact, WMR вероятно предложит более точную настройку.</p><h2 id="web-dev-server" tabindex="-1">@web/dev-server <a class="header-anchor" href="#web-dev-server" aria-hidden="true">#</a></h2><p><a href="https://modern-web.dev/docs/dev-server/overview/" target="_blank" rel="noopener noreferrer">@web/dev-server</a> (ранее <code>es-dev-server</code>) это отличный проект и Vite 1.0&#39;s Koa-based server setup был вдохновлён именно этим проектом.</p><p><code>@web/dev-server</code> в условиях нашего обсуждения, это немного низкоуровневый инструмент. Он не предоставляет официальных интеграций с фреймворками и требует ручной настройки конфигурации Rollup для production сборки.</p><p>В целом, Vite - это более самодостаточный / высокоуровневый инструмент, который призван обеспечивать более out-of-the-box рабочий процесс. И всё-таки, <code>@web</code> umbrella project содержит множество других прекрасных инструментов, которые также могут принести пользу Vite пользователям.</p>',23)];a.render=function(t,o,a,l,i,p){return e(),r("div",null,n)};export{o as __pageData,a as default};
