import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    if (location.protocol !== 'https:') {
      await location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
    await runtime.register();
    return;
  }
  console.log('Service worker not supported in this browser');
};

export default swRegister;
