// import React, { Component } from "react";
// import { connect } from "react-redux";
// // import "./LikeAndShare.scss";
// import { LANGUAGE } from "../../../utils";

// class LikeAndShare extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
      
//     };
//   }

//   componentDidMount() {
//     this.initFacebookSDK()
//   }

//   async componentDidUpdate(prevProps, prevState, snapshot) {
//    if (this.props.language !== prevProps.language) {
//     this.initFacebookSDK()
//    }
//   }

//   initFacebookSDK () {
//     if (window.FB) {
//         window.FB.XFBML.parse()
//     }

//     let {language} = this.props
//     let locale = language === LANGUAGE.VI ? 'vi_VN' : 'en_US'
//     window.fbAsyncInit = function () {
//         window.FB.init({
//             appId: process.env.REACT_APP_FACEBOOK_APP_ID,
//             cookie: true,
//             xfbml: true,
//             version: 'v2.5'
//         })
//     }
//     (function (d, s, id) {
//         var js, fjs = d.getElementsByTagName(s)[0]
//         if (d.getElementsByTagName(id)) {
//             return
//         }
//         js = d.createElement(s); js.id = id
//         js.src = `//connect.facebook.net/${locale}/all.js`
//         fjs.parentNode.insertBefore(js, fjs)
//     }(document, 'script', 'facebook-jssdk'))
//   }

//   render() {
//     let {dataHref} = this.props
//     return (
//       <>
//         <div className="fb-like"
//             data-Href={dataHref}
//             data-width=''
//             data-layout='standard'
//             data-action='like'
//             data-size='small'
//             data-share='true'>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LikeAndShare);
