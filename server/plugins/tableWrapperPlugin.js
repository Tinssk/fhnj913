// server/plugins/tableWrapperPlugin.js
export default function tableWrapperPlugin(md) {
  const defaultRender =
    md.renderer.rules.table_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
    return '<div class="table-wrapper">\n' + defaultRender(tokens, idx, options, env, self);
  };

  const tableClose =
    md.renderer.rules.table_close ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.table_close = function (tokens, idx, options, env, self) {
    return tableClose(tokens, idx, options, env, self) + "\n</div>";
  };
}
