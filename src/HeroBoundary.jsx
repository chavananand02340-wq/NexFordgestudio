import { Component } from "react";

// Generic crash boundary for any WebGL/3D accent on the site. If a
// particular canvas fails (WebGL context limit hit, driver issue, lost
// context, etc.) it silently disappears instead of taking the entire
// React tree down with it. Every <Canvas> on the site should be wrapped
// in one of these -- previously only the Hero's was, which meant a
// single failed accent canvas anywhere else on the page could crash the
// whole app to a blank/black screen.
export default class HeroBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("A 3D visual failed to render, hiding it gracefully:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
