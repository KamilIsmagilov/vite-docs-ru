import{o as n,c as s,d as a}from"./app.877e1a61.js";const t='{"title":"JavaScript API","description":"","frontmatter":{},"headers":[{"level":2,"title":"createServer","slug":"createserver"},{"level":2,"title":"InlineConfig","slug":"inlineconfig"},{"level":2,"title":"ViteDevServer","slug":"vitedevserver"},{"level":2,"title":"build","slug":"build"},{"level":2,"title":"resolveConfig","slug":"resolveconfig"}],"relativePath":"guide/api-javascript.md","lastUpdated":1631747979730}',p={},o=[a('<h1 id="javascript-api" tabindex="-1">JavaScript API <a class="header-anchor" href="#javascript-api" aria-hidden="true">#</a></h1><p>API-интерфейсы JavaScript Vite полностью типизированы, и рекомендуется использовать TypeScript или включить проверку типа JS в VSCode, чтобы использовать intellisense и проверку.</p><h2 id="createserver" tabindex="-1"><code>createServer</code> <a class="header-anchor" href="#createserver" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">createServer</span><span class="token punctuation">(</span>inlineConfig<span class="token operator">?</span><span class="token operator">:</span> InlineConfig<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>ViteDevServer<span class="token operator">&gt;</span>\n</code></pre></div><p><strong>Пример использования:</strong></p><div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token punctuation">{</span> createServer <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vite&#39;</span><span class="token punctuation">)</span>\n\n<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> server <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token comment">// любые валидные user config options, плюс `mode` и `configFile`</span>\n    configFile<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    root<span class="token operator">:</span> __dirname<span class="token punctuation">,</span>\n    server<span class="token operator">:</span> <span class="token punctuation">{</span>\n      port<span class="token operator">:</span> <span class="token number">1337</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token keyword">await</span> server<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="inlineconfig" tabindex="-1"><code>InlineConfig</code> <a class="header-anchor" href="#inlineconfig" aria-hidden="true">#</a></h2><p><code>InlineConfig</code> интерфейс расширяет <code>UserConfig</code> дополнительными свойствами:</p><ul><li><code>configFile</code>: укажите какой config файл использовать. Если не указано, Vite будет пытаться автоматически найти этот файл в вашем корневой директории. Поставьте значение <code>false</code>, чтобы отменить автопоиск конфиг файла.</li><li><code>envFile</code>: Поставьте <code>false</code>, чтобы отключить <code>.env</code> файлы.</li></ul><h2 id="vitedevserver" tabindex="-1"><code>ViteDevServer</code> <a class="header-anchor" href="#vitedevserver" aria-hidden="true">#</a></h2><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">ViteDevServer</span> <span class="token punctuation">{</span>\n  <span class="token comment">/**\n   * The resolved Vite config object.\n   */</span>\n  config<span class="token operator">:</span> ResolvedConfig\n  <span class="token comment">/**\n   * A connect app instance\n   * - Может быть использовано, чтобы добавить кастомные middlewares в ваш dev server.\n   * - Также может использоваться для обработки функции кастомного http server&#39;а\n   *   или как middleware в любом connect-style Node.js фреймворке.\n   *\n   * https://github.com/senchalabs/connect#use-middleware\n   */</span>\n  middlewares<span class="token operator">:</span> Connect<span class="token punctuation">.</span>Server\n  <span class="token comment">/**\n   * Нативный экземпляр Node http server&#39;а.\n   * Будет null в middleware mode.\n   */</span>\n  httpServer<span class="token operator">:</span> http<span class="token punctuation">.</span>Server <span class="token operator">|</span> <span class="token keyword">null</span>\n  <span class="token comment">/**\n   * Chokidar watcher instance.\n   * https://github.com/paulmillr/chokidar#api\n   */</span>\n  watcher<span class="token operator">:</span> FSWatcher\n  <span class="token comment">/**\n   * Web socket server с методом `send(payload)`.\n   */</span>\n  ws<span class="token operator">:</span> WebSocketServer\n  <span class="token comment">/**\n   * Rollup plugin container, который может запускать хуки плагинов на полученном файле.\n   */</span>\n  pluginContainer<span class="token operator">:</span> PluginContainer\n  <span class="token comment">/**\n   * Module graph, который отслеживает взаимоотношение импортов, url для маппинга файлов\n   * и hmr состояние.\n   */</span>\n  <span class="token keyword">module</span>Graph<span class="token operator">:</span> ModuleGraph\n  <span class="token comment">/**\n   * Programmatically resolve, загрузить и трансформировать URL и получить результат\n   * без прохождения через http request pipeline.\n   */</span>\n  <span class="token function">transformRequest</span><span class="token punctuation">(</span>\n    url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n    options<span class="token operator">?</span><span class="token operator">:</span> TransformOptions\n  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>TransformResult <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span>\n  <span class="token comment">/**\n   * Применить Vite built-in HTML трансформации и любые plugin HTML трансформации.\n   */</span>\n  <span class="token function">transformIndexHtml</span><span class="token punctuation">(</span>url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> html<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span>\n  <span class="token comment">/**\n   * Используйте для трансформации файла с esbuild.\n   * Может быть полезно для нескольких плагинов.\n   */</span>\n  <span class="token function">transformWithEsbuild</span><span class="token punctuation">(</span>\n    code<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n    filename<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n    options<span class="token operator">?</span><span class="token operator">:</span> EsbuildTransformOptions<span class="token punctuation">,</span>\n    inMap<span class="token operator">?</span><span class="token operator">:</span> object\n  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>ESBuildTransformResult<span class="token operator">&gt;</span>\n  <span class="token comment">/**\n   * Загрузить полученный URL как instantiated module для SSR.\n   */</span>\n  <span class="token function">ssrLoadModule</span><span class="token punctuation">(</span>\n    url<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>\n    options<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span> isolated<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">}</span>\n  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">any</span><span class="token operator">&gt;&gt;</span>\n  <span class="token comment">/**\n   * Fix ssr error stacktrace.\n   */</span>\n  <span class="token function">ssrFixStacktrace</span><span class="token punctuation">(</span>e<span class="token operator">:</span> Error<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span>\n  <span class="token comment">/**\n   * Запустить the server.\n   */</span>\n  <span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">,</span> isRestart<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>ViteDevServer<span class="token operator">&gt;</span>\n  <span class="token comment">/**\n   * Остановить the server.\n   */</span>\n  <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span>\n<span class="token punctuation">}</span>\n</code></pre></div><h2 id="build" tabindex="-1"><code>build</code> <a class="header-anchor" href="#build" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">build</span><span class="token punctuation">(</span>\n  inlineConfig<span class="token operator">?</span><span class="token operator">:</span> InlineConfig\n<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>RollupOutput <span class="token operator">|</span> RollupOutput<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>\n</code></pre></div><p><strong>Пример использования:</strong></p><div class="language-js"><pre><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> <span class="token punctuation">{</span> build <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;vite&#39;</span><span class="token punctuation">)</span>\n\n<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n  <span class="token keyword">await</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    root<span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&#39;./project&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    build<span class="token operator">:</span> <span class="token punctuation">{</span>\n      base<span class="token operator">:</span> <span class="token string">&#39;/foo/&#39;</span><span class="token punctuation">,</span>\n      rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token comment">// ...</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n</code></pre></div><h2 id="resolveconfig" tabindex="-1"><code>resolveConfig</code> <a class="header-anchor" href="#resolveconfig" aria-hidden="true">#</a></h2><p><strong>Type Signature:</strong></p><div class="language-ts"><pre><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">resolveConfig</span><span class="token punctuation">(</span>\n  inlineConfig<span class="token operator">:</span> InlineConfig<span class="token punctuation">,</span>\n  command<span class="token operator">:</span> <span class="token string">&#39;build&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;serve&#39;</span><span class="token punctuation">,</span>\n  defaultMode<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span>\n<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>ResolvedConfig<span class="token operator">&gt;</span>\n</code></pre></div>',20)];p.render=function(a,t,p,e,c,l){return n(),s("div",null,o)};export{t as __pageData,p as default};
