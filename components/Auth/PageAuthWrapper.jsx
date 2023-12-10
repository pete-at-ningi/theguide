import { Auth } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Nav from './Nav';
import Footer from './Footer';
import styled from 'styled-components';
import Image from 'next/image';
import Loading from '../Loading';

const PageWrap = styled.div`
  background: #f6f5f4;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const AuthInner = styled.div`
  background-color: #fff;
  border-radius: 24px;
  box-sizing: border-box;
  color: rgb(23, 26, 21);
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  line-height: 27px;
  padding: 40px 48px;
  text-align: center;
  width: 598px;
  -webkit-font-smoothing: antialiased;

  @media (max-width: 640px) {
    width: 90%;
    padding: 20px;
  }
`;

const Intro = styled.p`
  color: rgb(23, 26, 21);
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  line-height: 21px;
  margin: 0 0 16px 0;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  width: 502px;

  @media (max-width: 640px) {
    width: 90%;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 2rem;
`;

const Welcome = styled.h1`
  box-sizing: border-box;
  color: rgb(23, 26, 21);
  cursor: default;
  display: block;
  font-family: 'Sora', sans-serif;
  font-size: 30px;
  font-weight: 500;
  height: 39px;
  letter-spacing: -0.5px;
  line-height: 39px;
  margin-block-end: 16px;
  margin-block-start: 0px;
  margin-bottom: 16px;
  margin-inline-end: 0px;
  margin-inline-start: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  text-align: center;
`;

const Profile = ({ children }) => {
  const session = useSession();
  const isLoading = useSession();
  const supabase = useSupabaseClient();

  return !session && !!isLoading ? (
    <Loading />
  ) : (
    <>
      {!session ? (
        <PageWrap>
          <TopWrap>
            <a
              href='http://www.ningi.co.uk'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image src='/ongoing.png' width='368' height='95' />
            </a>
            <AuthInner>
              <Welcome>Welcome</Welcome>
              <Intro>
                Enter your invite details below and start checking out the
                awesomeness that lays within.
              </Intro>
              <Auth
                supabaseClient={supabase}
                providers={false}
                showLinks={false}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: 'email',
                      email_input_placeholder: 'Enter your email',
                      password_label: 'password',
                      password_input_placeholder: 'Enter a password',
                      button_label: 'Log in',
                    },
                  },
                }}
                appearance={{
                  style: {
                    container: {},
                    divider: {},
                    label: {
                      textTransform: 'uppercase',
                      fontWeight: '500',
                      color: 'rgb(23, 26, 21)',
                      lineHeight: '16.8px',
                      marginBottom: '8px',
                      letterSpacing: '1px',
                      fontSize: '12px',
                      textAlign: 'left',
                    },
                    input: {
                      appearance: 'auto',
                      backgroundColor: 'rgb(246, 245, 244)',
                      borderBottomColor: 'rgb(201, 202, 201)',
                      borderBottomLeftRadius: '4px',
                      borderBottomRightRadius: '4px',
                      borderBottomStyle: 'solid',
                      borderBottomWidth: '1px',
                      borderImageOutset: '0',
                      borderImageRepeat: 'stretch',
                      borderImageSlice: '100%',
                      borderImageSource: 'none',
                      borderImageWidth: '1',
                      borderLeftColor: 'rgb(201, 202, 201)',
                      borderLeftStyle: 'solid',
                      borderLeftWidth: '1px',
                      borderRightColor: 'rgb(201, 202, 201)',
                      borderRightStyle: 'solid',
                      borderRightWidth: '1px',
                      borderTopColor: 'rgb(201, 202, 201)',
                      borderTopLeftRadius: '4px',
                      borderTopRightRadius: '4px',
                      borderTopStyle: 'solid',
                      borderTopWidth: '1px',
                      boxSizing: 'border-box',
                      color: 'rgb(23, 26, 21)',
                      cursor: 'text',
                      fontFamily: 'Sora, sans-serif',
                      fontFeatureSettings: 'normal',
                      fontKerning: 'auto',
                      fontOpticalSizing: 'auto',
                      fontSize: '16px',
                      fontStretch: '100%',
                      fontStyle: 'normal',
                      fontVariantAlternates: 'normal',
                      fontVariantCaps: 'normal',
                      fontVariantEastAsian: 'normal',
                      fontVariantLigatures: 'normal',
                      fontVariantNumeric: 'normal',
                      fontVariantPosition: 'normal',
                      fontVariationSettings: 'normal',
                      fontWeight: '400',
                      height: '50px',
                      letterSpacing: 'normal',
                      lineHeight: '25.6px',
                      marginBottom: '20px',
                      marginLeft: '0px',
                      marginRight: '0px',
                      marginTop: '0px',
                      paddingBottom: '24px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      paddingTop: '24px',
                      textAlign: 'start',
                      textIndent: '0px',
                      textRendering: 'auto',
                      textShadow: 'none',
                      textTransform: 'none',
                      verticalAlign: 'middle',
                      wordSpacing: '0px',
                      writingMode: 'horizontal-tb',
                      WebkitFontSmoothing: 'antialiased',
                      WebkitRtlOrdering: 'logical',
                    },
                    loader: {},
                    button: {
                      alignItems: 'flex-start',
                      appearance: 'button',
                      backgroundColor: 'rgb(23, 26, 21)',
                      borderBottomColor: 'rgb(23, 26, 21)',
                      borderBottomLeftRadius: '8px',
                      borderBottomRightRadius: '8px',
                      borderBottomStyle: 'solid',
                      borderBottomWidth: '2px',
                      borderImageOutset: '0',
                      borderImageRepeat: 'stretch',
                      borderImageSlice: '100%',
                      borderImageSource: 'none',
                      borderImageWidth: '1',
                      borderLeftColor: 'rgb(23, 26, 21)',
                      borderLeftStyle: 'solid',
                      borderLeftWidth: '2px',
                      borderRightColor: 'rgb(23, 26, 21)',
                      borderRightStyle: 'solid',
                      borderRightWidth: '2px',
                      borderTopColor: 'rgb(23, 26, 21)',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                      borderTopStyle: 'solid',
                      borderTopWidth: '2px',
                      boxSizing: 'border-box',
                      color: 'rgb(255, 255, 255)',
                      cursor: 'pointer',
                      display: 'block',
                      fontFamily: 'Sora, sans-serif',
                      fontFeatureSettings: 'normal',
                      fontKerning: 'auto',
                      fontOpticalSizing: 'auto',
                      fontSize: '16px',
                      fontStretch: '100%',
                      fontStyle: 'normal',
                      fontVariantAlternates: 'normal',
                      fontVariantCaps: 'normal',
                      fontVariantEastAsian: 'normal',
                      fontVariantLigatures: 'normal',
                      fontVariantNumeric: 'normal',
                      fontVariantPosition: 'normal',
                      fontVariationSettings: 'normal',
                      fontWeight: '500',
                      height: '64.7969px',
                      letterSpacing: 'normal',
                      lineHeight: '20.8px',
                      marginBottom: '0px',
                      marginLeft: '0px',
                      marginRight: '0px',
                      marginTop: '0px',
                      paddingBlockEnd: '20px',
                      paddingBlockStart: '20px',
                      paddingBottom: '20px',
                      paddingInlineStart: '32px',
                      paddingLeft: '32px',
                      paddingRight: '32px',
                      paddingTop: '20px',
                      textAlign: 'center',
                      textDecorationColor: 'rgb(255, 255, 255)',
                      textDecorationLine: 'none',
                      textDecorationStyle: 'solid',
                      textDecorationThickness: 'auto',
                      textIndent: '0px',
                      textRendering: 'auto',
                      textShadow: 'none',
                      textSizeAdjust: '100%',
                      textTransform: 'none',
                      textWrap: 'nowrap',
                      transitionBehavior: 'normal, normal',
                      transitionDelay: '0s, 0s',
                      transitionDuration: '0.15s, 0.15s',
                      transitionProperty: 'color, background-color',
                      transitionTimingFunction: 'ease, ease',
                      userSelect: 'none',
                      whiteSpaceCollapse: 'preserve',
                      wordSpacing: '0px',
                      writingMode: 'horizontal-tb',
                      WebkitFontSmoothing: 'antialiased',
                      WebkitRtlOrdering: 'logical',
                    },
                    message: {
                      boxSizing: 'border-box',
                      color: 'rgb(239, 118, 99)',
                      cursor: 'default',
                      display: 'block',
                      fontFamily: 'Sora, sans-serif',
                      fontSize: '14px',
                      fontWeight: '400',
                      height: '21px',
                      lineHeight: '21px',
                      marginTop: '24px',
                      textAlign: 'center',
                      textSizeAdjust: '100%',
                      width: '502px',
                      WebkitFontSmoothing: 'antialiased',
                    },
                  },
                }}
              />
            </AuthInner>
          </TopWrap>
          <Footer />
        </PageWrap>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Profile;
