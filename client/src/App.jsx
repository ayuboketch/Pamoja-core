import { ConfigProvider } from "antd";
import theme from "./theme";

function App() {


  return (
    <ConfigProvider theme={theme}>
      <div className="flex items-center justify-center h-screen">
        <img src="/logo.png" alt="Pamoja" />
        <h1>Pamoja Platform</h1>
      </div>
    </ConfigProvider>
  );
}

export default App;
