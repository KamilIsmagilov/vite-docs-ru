import{o as n,c as s,d as a}from"./app.877e1a61.js";const e='{"title":"Server-Side Rendering","description":"","frontmatter":{},"headers":[{"level":2,"title":"Примеры проектов","slug":"примеры-проектов"},{"level":2,"title":"Source Structure","slug":"source-structure"},{"level":2,"title":"Условная логика","slug":"усnовная-nогика"},{"level":2,"title":"Настраиваем Dev Server","slug":"настраиваем-dev-server"},{"level":2,"title":"Сборка для Production","slug":"сборка-дnя-production"},{"level":2,"title":"Generating Preload Directives","slug":"generating-preload-directives"},{"level":2,"title":"Pre-Rendering / SSG","slug":"pre-rendering-ssg"},{"level":2,"title":"SSR Externals","slug":"ssr-externals"},{"level":2,"title":"SSR-specific Plugin Logic","slug":"ssr-specific-plugin-logic"},{"level":2,"title":"SSR Target","slug":"ssr-target"},{"level":2,"title":"SSR Bundle","slug":"ssr-bundle"}],"relativePath":"guide/ssr.md","lastUpdated":1631744736365}',t={},p=[a('<h1 id="server-side-rendering" tabindex="-1">Server-Side Rendering <a class="header-anchor" href="#server-side-rendering" aria-hidden="true">#</a></h1><div class="warning custom-block"><p class="custom-block-title">Экспериментальная функция</p><p>Поддержка SSR всё ещё находится в экспериментальной стадии и вы можете столкнуться с багами не поддерживаемыми случаями. Продолжайте на свой страх и риск.</p></div><div class="tip custom-block"><p class="custom-block-title">Заметка</p><p>SSR спецификация относится к front-end фреймворкам (например, React, Preact, Vue, и Svelte), которые поддерживают запуск одного и того же приложения на Node.js, pre-rendering приложения в HTML и в завершении hdrating (гидратации) приложения на клиенте. Если вы идите интеграции с традиционными server-side фреймворками, взгляните сюда <a href="./backend-integration.html">Backend Integration guide</a>.</p><p>Текущее руководство также предполагает, что у вас уже есть предыдущий опыт работы с SSR в вашем любимом фреймворке, и этот гайд фокусируется только на Vite-specific деталях интеграции.</p></div><div class="warning custom-block"><p class="custom-block-title">Low-level API</p><p>Это low-level (низкоуровневое) API предназначенное для авторов библиотек и фреймворков. Если ваша цель создать приложение, то сначала поищите higher-level (высокоуровневое решение) SSR плагины и инструменты в разделе <a href="https://github.com/vitejs/awesome-vite#ssr" target="_blank" rel="noopener noreferrer">Awesome Vite SSR</a>. Тем не менее многие приложения успешно создаются непосредственно поверх нативного низкоуровнего (low-level) API Vite.</p></div><div class="tip custom-block"><p class="custom-block-title">Помощь</p><p>Если у вас есть вопросы, сообщество придёт к вам на помощь в <a href="https://discord.gg/PkbxgzPhJv" target="_blank" rel="noopener noreferrer">Vite Discord&#39;s #ssr channel</a>.</p></div><h2 id="примеры-проектов" tabindex="-1">Примеры проектов <a class="header-anchor" href="#примеры-проектов" aria-hidden="true">#</a></h2><p>Vite предоставляет built-in (встроенную) поддержку для server-side rendering (SSR). Vite playground содержит пример SSR настройки для Vue 3 и React, что может быть использовано как референсы для текущего руководства:</p><ul><li><a href="https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue" target="_blank" rel="noopener noreferrer">Vue 3</a></li><li><a href="https://github.com/vitejs/vite/tree/main/packages/playground/ssr-react" target="_blank" rel="noopener noreferrer">React</a></li></ul><h2 id="source-structure" tabindex="-1">Source Structure <a class="header-anchor" href="#source-structure" aria-hidden="true">#</a></h2><p>Типичное SSR приложение будет содержать следующую структуру файлов:</p><div class="language-"><pre><code>- index.html\n- src/\n  - main.js          # exports env-agnostic (universal) app code\n  - entry-client.js  # mounts the app to a DOM element\n  - entry-server.js  # renders the app using the framework&#39;s SSR API\n</code></pre></div><p><code>index.html</code> должен ссылаться на <code>entry-client.js</code> и включать в себя placeholder, куда будет вставлена сгенерированная сервером (server-rendered) разметка:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token comment">&lt;!--ssr-outlet--&gt;</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>module<span class="token punctuation">&quot;</span></span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/src/entry-client.js<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>Вы можете использовать любой placeholder на ваше усмотрение, вместо <code>&lt;!--ssr-outlet--&gt;</code>, любой, который может быть заменён.</p><h2 id="усnовная-nогика" tabindex="-1">Условная логика <a class="header-anchor" href="#усnовная-nогика" aria-hidden="true">#</a></h2><p>Если вам нужно выполнить условную логику опираясь на том, где мы, на SSR или на клиенте, вы можете использовать это</p><div class="language-js"><pre><code><span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">SSR</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// ... server only logic</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>Это статично замениться во время сборки, поэтому это позволяет tree-shaking неиспользуемые ветки.</p><h2 id="настраиваем-dev-server" tabindex="-1">Настраиваем Dev Server <a class="header-anchor" href="#настраиваем-dev-server" aria-hidden="true">#</a></h2><p>Когда собирается SSR приложение, вы вероятно захотите иметь полный контроль над вашим главным сервером и отделить Vite от production окружения. Поэтому рекомендуется использовать Vite в режиме middleware. Вот пример с <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer">express</a>:</p><p><strong>server.js</strong></p><div class="language-js"><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlighted"> </div><div class="highlighted"> </div><div class="highlighted"> </div><br><br><br><br><br><br><br><br><br></div><pre><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;fs&#39;</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> createServer<span class="token operator">:</span> createViteServer <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vite&#39;</span><span class="token punctuation">)</span>\n\n<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n  <span class="token comment">// Создаём Vite сервер в middleware режиме. Это отключит собственный HTML Vite&#39;а</span>\n  <span class="token comment">// serving logic and let the parent server take control.</span>\n  <span class="token comment">//</span>\n  <span class="token comment">// Если вы хотите использовать Vite&#39;s own HTML serving logic (используя Vite как</span>\n  <span class="token comment">// a development middleware), используйте вместо этого &#39;html&#39;.</span>\n  <span class="token keyword">const</span> vite <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createViteServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    server<span class="token operator">:</span> <span class="token punctuation">{</span> middlewareMode<span class="token operator">:</span> <span class="token string">&#39;ssr&#39;</span> <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token comment">// используйте vite&#39;s connect instance как middleware</span>\n  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>vite<span class="token punctuation">.</span>middlewares<span class="token punctuation">)</span>\n\n  app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// serve index.html - we will tackle this next</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n  app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n\n<span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre></div><p>Здесь <code>vite</code> - это экземпляр <a href="./api-javascript.html#vitedevserver">ViteDevServer</a>. <code>vite.middlewares</code> - это экземпляр <a href="https://github.com/senchalabs/connect" target="_blank" rel="noopener noreferrer">Connect</a>, который может быть использован как middleware в любом connect-compatible Node.js фреймворке.</p><p>Следующий шаг - это реализация <code>*</code> обработчика, чтобы сёрвить server-rendered HTML:</p><div class="language-js"><pre><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;*&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> url <span class="token operator">=</span> req<span class="token punctuation">.</span>originalUrl\n\n  <span class="token keyword">try</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 1. Read index.html</span>\n    <span class="token keyword">let</span> template <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>\n      path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;index.html&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token string">&#39;utf-8&#39;</span>\n    <span class="token punctuation">)</span>\n\n    <span class="token comment">// 2. Применяем Vite HTML трансформации. Это заинжектит Vite HMR client, и</span>\n    <span class="token comment">//    также применит HTML трансформации из Vite плагинов, например, global preambles</span>\n    <span class="token comment">//    из @vitejs/plugin-react-refresh</span>\n    template <span class="token operator">=</span> <span class="token keyword">await</span> vite<span class="token punctuation">.</span><span class="token function">transformIndexHtml</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> template<span class="token punctuation">)</span>\n\n    <span class="token comment">// 3. Загружаем the server entry. vite.ssrLoadModule автоматически трансформирует</span>\n    <span class="token comment">//    ваш ESM исходный код для использования в Node.js! Здесь не нужен никакой бандлер,</span>\n    <span class="token comment">//    и предоставит эффективную инвалидацию, похожую на HMR.</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> render <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> vite<span class="token punctuation">.</span><span class="token function">ssrLoadModule</span><span class="token punctuation">(</span><span class="token string">&#39;/src/entry-server.js&#39;</span><span class="token punctuation">)</span>\n\n    <span class="token comment">// 4. render the app HTML. Это предполагает entry-server.js&#39;s exported `render`</span>\n    <span class="token comment">//    function calls appropriate framework SSR APIs,</span>\n    <span class="token comment">//    e.g. ReactDOMServer.renderToString()</span>\n    <span class="token keyword">const</span> appHtml <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">render</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>\n\n    <span class="token comment">// 5. Инжектим the app-rendered HTML в шаблон.</span>\n    <span class="token keyword">const</span> html <span class="token operator">=</span> template<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;!--ssr-outlet--&gt;</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> appHtml<span class="token punctuation">)</span>\n\n    <span class="token comment">// 6. Посылаем the rendered HTML обратно клиенту.</span>\n    res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;text/html&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Если возникла какая-то ошибка, позволяем Vite fix the stracktrace so it maps back to</span>\n    <span class="token comment">// your actual source code.</span>\n    vite<span class="token punctuation">.</span><span class="token function">ssrFixStacktrace</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>\n    console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>\n    res<span class="token punctuation">.</span><span class="token function">status</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>message<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p><code>dev</code> скрипт в <code>package.json</code> должен также быть заменён на использование server script:</p><div class="language-diff"><pre><code><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> &quot;scripts&quot;: {\n</span></span><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line">   &quot;dev&quot;: &quot;vite&quot;\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line">   &quot;dev&quot;: &quot;node server&quot;\n</span></span><span class="token unchanged"><span class="token prefix unchanged"> </span><span class="token line"> }\n</span></span></code></pre></div><h2 id="сборка-дnя-production" tabindex="-1">Сборка для Production <a class="header-anchor" href="#сборка-дnя-production" aria-hidden="true">#</a></h2><p>Чтобы поставить SSR проект для production, нам нужно сделать следующее:</p><ol><li>Создать клиентский build как нормальный (обычный);</li><li>Создать SSR build, который может быть напрямую загружен с помощью <code>require()</code> так что нам не нужно проходить через Vite&#39;s <code>ssrLoadModule</code>;</li></ol><p>Наши скрипты в <code>package.json</code> будут выглядеть так:</p><div class="language-json"><pre><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;node server&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;build:client&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build --outDir dist/client&quot;</span><span class="token punctuation">,</span>\n    <span class="token property">&quot;build:server&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vite build --outDir dist/server --ssr src/entry-server.js &quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>Обратите внимание на <code>--ssr</code> флаг, который показывает, что это SSR build. Также мы должны указать SSR entry.</p><p>Затем, в <code>server.js</code> файле нам нужно добавить некоторую production specific логику, с помощью проверки <code>process.<wbr>env.NODE_ENV</code>:</p><ul><li><p>Вместо того, чтобы читать рутовый <code>index.html</code>, используйте <code>dist/client/index.html</code> как шаблон, поскольку он содержит правильные ссылки на ресурсы (asset) для клиентской сборки.</p></li><li><p>Вместо <code>await vite.ssrLoadModule(&#39;/src/entry-server.js&#39;)</code>, используйте <code>require(&#39;./dist/server/entry-server.js&#39;)</code> (этот файл результат SSR сборки).</p></li><li><p>Переместите создание и использование <code>vite</code> dev server&#39;а за пределы dev-only условий в коде, затем, добавьте статичные file serving middlewares, чтобы обрабатывать (сёрвить) файлы из <code>dist/client</code>.</p></li></ul><p>Ссылки на <a href="https://github.com/vitejs/vite/tree/main/packages/playground/ssr-vue" target="_blank" rel="noopener noreferrer">Vue</a> и <a href="https://github.com/vitejs/vite/tree/main/packages/playground/ssr-react" target="_blank" rel="noopener noreferrer">React</a> демо для рабочих настроек.</p><h2 id="generating-preload-directives" tabindex="-1">Generating Preload Directives <a class="header-anchor" href="#generating-preload-directives" aria-hidden="true">#</a></h2><p><code>vite build</code> поддерживает флаг <code>--ssrManifest</code>, который генерирует <code>ssr-manifest.json</code> в build output директорию:</p><div class="language-diff"><pre><code><span class="token deleted-sign deleted"><span class="token prefix deleted">-</span><span class="token line"> &quot;build:client&quot;: &quot;vite build --outDir dist/client&quot;,\n</span></span><span class="token inserted-sign inserted"><span class="token prefix inserted">+</span><span class="token line"> &quot;build:client&quot;: &quot;vite build --outDir dist/client --ssrManifest&quot;,\n</span></span></code></pre></div><p>Скрипт выше сгенерирует <code>dist/client/ssr-manifest.json</code> для клиентской сборки (Да, SSR manifest генерируется из client build потому что нам нужно маппить module IDs к клиентским файлам). Manifest содержит маппинги ID модулей к их связанным чанкам и ассетам (ресурсам).</p><p>Чтобы использовать манифест, фреймворки должны предоставить путь для сбора ID модулей компонентов, которые были использованы во время вызова server render&#39;а.</p><p><code>@vitejs/plugin-vue</code> поддерживает это из коробки и автоматически регистрирует используемые ID модули компонентов в связанном Vue SSR context:</p><div class="language-js"><pre><code><span class="token comment">// src/entry-server.js</span>\n<span class="token keyword">const</span> ctx <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token keyword">await</span> vueServerRenderer<span class="token punctuation">.</span><span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span>\n<span class="token comment">// ctx.modules is now a Set of module IDs that were used during the render</span>\n</code></pre></div><p>В production ветке <code>server.js</code> мы должны прочитать и передать manifest в <code>render</code> функцию, которая экспортируется в <code>src/entry-server.js</code>. Это предоставит нам достаточную информацию для рендера preload directives для файлов используемых в async рутах! Смотрите <a href="https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/entry-server.js" target="_blank" rel="noopener noreferrer">demo source</a> для полного примера.</p><h2 id="pre-rendering-ssg" tabindex="-1">Pre-Rendering / SSG <a class="header-anchor" href="#pre-rendering-ssg" aria-hidden="true">#</a></h2><p>Если руты (routes) и необходимые для них данные определены заранее, мы можем сделать pre-render этих путей в статичный HTML используя ту же логику, как и в production SSR. Это также можно рассматривать как вид Static-Site Generation (SSG). Смотрите <a href="https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/prerender.js" target="_blank" rel="noopener noreferrer">demo pre-render script</a> для наглядного примера.</p><h2 id="ssr-externals" tabindex="-1">SSR Externals <a class="header-anchor" href="#ssr-externals" aria-hidden="true">#</a></h2><p>Множество зависимостей поставляются как файлы ESM и CommonJS. Когда запускается SSR, зависимость, которая предоставляет сборку CommonJS и может быть &quot;экстернализирована&quot; из Vite&#39;s SSR transform / module system, чтобы улучшить скорость и dev и build. Например, вместо того, чтобы извлекать в pre-bundled ESM версию React и затем трансформировать её обратно для Node.js-совместимым, более эффективно использовать вместо этого <code>require(&#39;react&#39;)</code>. Это также значительно увеличивает скорость сборки SSR bundle.</p><p>Vite выполняет автоматическую SSR экстернализацию с помощью следующей эвристики:</p><ul><li><p>Если у зависимости резолвнутый ESM entry point и его дефолтный Node entry point различные, вероятно дефолтный Node entry - это CommonJS build, который может быть экстернализирован. Например, <code>vue</code> будет автоматически экстернализирован потому что он поставляется как в ESM, так и в CommonJS сборках.</p></li><li><p>В противном случае, Vite проверит, содержит ли entry point валидный ESM синтаксис - если нет, пакет вероятнее всего в формате CommonJS и будет экстернализирован. Например, <code>react-dom</code> будет автоматически экстернализирован, потому что он имеет только один entry, которая в формате CommonJS.</p></li></ul><p>Если эта эвристика приводит к ошибкам, вы можете вручную настроить внешние параметры SSR, используя параметры конфигурации <code>ssr.external</code> и<code>ssr.noExternal</code>.</p><p>В будущем эта эвристика, вероятно, будет улучшена, чтобы определять, включен ли в проекте <code>type:&quot; module &quot;</code>, так что Vite может также экстернализовать зависимости, которые поставляют сборки ESM, совместимые с Node, путем их импорта через динамический <code>import ()</code> во время SSR.</p><div class="warning custom-block"><p class="custom-block-title">Работа с Aliases</p><p>Если вы настроили aliases, которые перенаправляют один пакет на другой, то вероятно вы захотите связать актуальные <code>node_modules</code> пакеты, чтобы это работало для SSR экстернелизированных зависимостей. И <a href="https://classic.yarnpkg.com/en/docs/cli/add/#toc-yarn-add-alias" target="_blank" rel="noopener noreferrer">Yarn</a> и <a href="https://pnpm.js.org/en/aliases" target="_blank" rel="noopener noreferrer">pnpm</a> поддерживают aliasing через <code>npm:</code> префикс.</p></div><h2 id="ssr-specific-plugin-logic" tabindex="-1">SSR-specific Plugin Logic <a class="header-anchor" href="#ssr-specific-plugin-logic" aria-hidden="true">#</a></h2><p>Некоторые фреймворки, такие, как Vue или Svelte компилируют компоненты в разные форматы, в зависимости от того, пойдёт это на клиент или SSR. Чтобы поддерживать трансформаирование по условию, Vite передаёт дополнительный аргумент <code>ssr</code> в следующие хуки плагинов:</p><ul><li><code>resolveId</code></li><li><code>load</code></li><li><code>transform</code></li></ul><p><strong>Пример:</strong></p><div class="language-js"><pre><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">mySSRPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    name<span class="token operator">:</span> <span class="token string">&#39;my-ssr&#39;</span><span class="token punctuation">,</span>\n    <span class="token function">transform</span><span class="token punctuation">(</span><span class="token parameter">code<span class="token punctuation">,</span> id<span class="token punctuation">,</span> ssr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>ssr<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// perform ssr-specific transform...</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="ssr-target" tabindex="-1">SSR Target <a class="header-anchor" href="#ssr-target" aria-hidden="true">#</a></h2><p>По умолчанию, target для SSR сборки - это node environment, но вы также можете запустить сервер в Web Worker&#39;е. Packages entry resolution разный для каждой платформы. Вы можете настроить target как Web Worker установив <code>ssr.target</code> в значение<code>&#39;webworker&#39;</code>.</p><h2 id="ssr-bundle" tabindex="-1">SSR Bundle <a class="header-anchor" href="#ssr-bundle" aria-hidden="true">#</a></h2><p>В некоторых случаях, таких как <code>webworker</code> runtimes, вы возможно захотите собрать ваш SSR build в один JavaScript файл. Вы можете активировать это поведение установив <code>ssr.noExternal</code> в значение <code>true</code>. Это сделает две вещи:</p><ul><li>Обработает все зависимости как <code>noExternal</code></li><li>Выведет ошибку, если импортируются какие-либо встроенные (built-in) Node.js модули</li></ul>',63)];t.render=function(a,e,t,o,c,r){return n(),s("div",null,p)};export{e as __pageData,t as default};
