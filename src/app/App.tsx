import './styles/global.css';

import { useEffect } from 'react';

function App() {
  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.info(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold underline">Rectangle Creator</h2>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
