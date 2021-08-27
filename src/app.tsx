const container = document.querySelector("#app");
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app";
import { GlobalStyles } from "./components/Global";
import { Container } from "./components/styled/Container";

ReactDOM.render(<Container>
    <GlobalStyles />
    <App />
    </Container>, container);