import styled from 'styled-components'
export const Wrapper = styled.div`
    background: #170627;
`
export const ContentWrapper = styled.div`
    padding: 20px 40px 40px 40px;
    display: flex;
`
export const MainContent = styled.div`
    padding: 20px 0px 0px 40px;
    width: 100%;
`
export const FirstDiv = styled.div`
    display: flex;
    align-items: center;
`
export const SmallLogo = styled.div`
    height: 20px;
    width: 20px;
    background-image: url('${(props) => props.src}');
    background-position: center;
    background-size: cover;
`
export const SmallText = styled.div`
    color: white;
    padding: 2px 0px 6px 10px;
    font-family: Be Vietnam;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;

    text-align: left;
`
export const HeadingDiv = styled.div`
    font-family: Poppins;
    font-size: 48px;
    font-style: normal;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: -0.015em;
    text-align: left;
    background: linear-gradient(
        88.04deg,
        #ee787b 22.54%,
        #e153f2 41.08%,
        #495be0 65.25%,
        #6a39f3 86.1%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
`
export const Subheading = styled.div`
    color: white;
    font-family: Be Vietnam;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
`
export const TagsDiv = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    color: rgba(165, 165, 165, 1);
    font-family: Be Vietnam;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.05em;
`
export const Tag = styled.div`
    color: white;
    border: 1px solid white;
    border-radius: 20px;
    padding: 3px 10px;
    margin-right: 15px;
    text-align: center;
`

export const HeaderLine = styled.div`
    margin: 40px 0px 20px 0px;
    width: 100%;
    height: 2px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`
export const SecondDiv = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
`
export const SecondDivName = styled.div`
    font-family: Be Vietnam;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 35px;
    letter-spacing: 0em;
    text-align: left;
    color: rgba(255, 0, 184, 1);
`
export const AnotherDiv = styled.div`
    display: flex;
    color: white;
    align-items: center;
`
export const Circle = styled.div`
    height: 30px;
    width: 30px;
    border: 5px solid white;
    border-radius: 100%;
`
export const ProgressInfoDiv = styled.div`
    margin-left: 10px;
    margin-right: 20px;
`
export const ProgressInfoDivOne = styled.div`
    color: white;
    font-family: Be Vietnam;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.03em;
    text-align: left;
`
export const ProgressInfoDivTwo = styled.div`
    font-family: Be Vietnam;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.03em;
    text-align: left;
`
export const ThirdDiv = styled.div`
    padding-top: 30px;
    color: white;
`
export const Box = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid #7e3bdc;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 30px 20px 30px 20px;
`
export const BoxTitle = styled.div`
    color: white;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 27px;
    letter-spacing: 0.05em;
    text-align: left;
`
export const BoxSubtitle = styled.div`
    font-family: Be Vietnam;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    padding-bottom: 20px;
`
export const StartButton = styled.div`
    max-width: 200px;
    margin-top: 10px;
    font-family: Poppins;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0.05em;
    text-align: center;
    color: white;
    border-radius: 20px;
    border: solid 1px transparent;
    background-image: linear-gradient(#170627, #170627),
        linear-gradient(90deg, #ff00b8 0%, #7e3bdc 50.52%, #0075ff 100%);
    background-origin: border-box;
    background-clip: content-box, border-box;

    &:hover {
        cursor: pointer;
    }
`

export const ButtonText = styled.p`
    padding: 5px 30px 8px 30px;
    font-size: 14px;
`
