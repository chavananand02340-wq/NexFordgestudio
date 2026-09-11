import { Component } from "react";

export default class HeroBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("Hero 3D failed, falling back to static hero glow:", error);
  }

  render() {
    if (this.state.hasError) {
      return <div className="hero-fallback-glow" aria-hidden="true" />;
    }
    return this.props.children;
  }
}
