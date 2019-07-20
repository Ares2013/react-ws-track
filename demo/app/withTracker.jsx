import React, { Component } from 'react';
import ReactWsTrack from '../../src';

export default function withTracker(WrappedComponent, options = {}) {
  const trackPage = (page) => {
    ReactWsTrack.set({
      page,
      ...options
    });
    ReactWsTrack.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}
