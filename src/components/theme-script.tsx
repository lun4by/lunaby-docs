export function ThemeColorScript() {
  const script = `
    (function() {
      try {
        var color = localStorage.getItem('lunaby-theme-color');
        if (color && color !== 'neutral') {
          document.documentElement.setAttribute('data-theme-color', color);
        }
      } catch(e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
