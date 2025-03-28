export const App = (elementId) => {

    (() => {
        const app = document.createElement('div');
        app.innerHTML = '<h1> Hello World</h1>';
        document.querySelector(elementId).append(app);
    })();

}