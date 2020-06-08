interface IRoutes { [key: string]: any };

class Router {
  private root = document.getElementById('app');

  private routes: IRoutes = {
    '/': 'content',
    '/register': '<div style="display: flex; min-width: 100vw; height: 100vh; background: red;">register-content</div>',
  };

  public push(pathname: string): void {
    window.history.pushState({}, pathname, `${window.location.origin}${pathname}`)

    this.cleanContent();

    this.root.appendChild(this.routes[window.location.pathname]());

    window.router = this.routes;

    this.updateRoute();
  }

  private updateRoute(): void {
    window.onpopstate = () =>{

      this.cleanContent();

      this.root.appendChild(this.routes[window.location.pathname]())
    }
  }

  private cleanContent() : void {
    this.root.innerHTML = '';
  }
}

export default new Router();
