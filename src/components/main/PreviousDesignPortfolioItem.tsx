import { styled } from 'styled-components';
import { PortfolioDataType } from '@src/types/portfolioType';
import { ReactComponent as DefaultUserImage } from '@src/assets/nav/nav-default-user-image-icon.svg';
import { useNavigate } from 'react-router-dom';
import { PATH_URL } from '@src/constants/constants';

// 리디자인 이전 버전 포트폴리오 아이템 컴포넌트 - 유사 시 참고, 모든 기능 완료 후 삭제 예정
const PreviousDesignPortfolioItem: React.FC<{ item: PortfolioDataType }> = ({ item }) => {
  const noImageUrl = 'public/images/no-img.jpg';
  const isportfolioImageExist = item.portfolioImage !== null;
  const navigate = useNavigate();

  const onClickPortfolioItem = () => {
    navigate(`${PATH_URL.PORTFOLIO_DETAIL}/${item.id}`);
  };

  return (
    <StItemContainer onClick={onClickPortfolioItem}>
      <StImgContainer>
        {isportfolioImageExist ? (
          <StPortfolioImg src={item.portfolioImage} />
        ) : (
          <StNoImg src={noImageUrl} />
        )}
      </StImgContainer>
      <StDescriptionContainer>
        <StUserDescriptionContainer>
          <StUserDefaultImage />
          <StUserNameText>{item.userName}</StUserNameText>
        </StUserDescriptionContainer>
        <StTitleText>{item.portfolioTitle}</StTitleText>
      </StDescriptionContainer>
    </StItemContainer>
  );
};

const StItemContainer = styled.div`
  cursor: pointer;
`;

const StImgContainer = styled.div`
  width: 250px;
`;

const imageStyle = `
  width: 100%;
  height: 310px;
  object-fit: cover;
  border: 1px solid;
  border-radius: 7px;
`;

const StPortfolioImg = styled.img`
  ${imageStyle}
`;

const StNoImg = styled.img`
  ${imageStyle}
`;

const StDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  margin-top: 3px;
  padding: 7px 10px 10px 10px;
  border: 1px solid;
  border-radius: 13px;
  background: rgba(221, 221, 221, 0.27);
  box-shadow: inset 0px 3px 7px rgba(117, 117, 117, 0.25);
`;

const StTitleText = styled.div`
  font-weight: bold;
  padding-top: 8px;
  color: ${({ theme }) => theme.color.fontColor};
`;

const StUserDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StUserNameText = styled.div`
  padding-left: 7px;
  font-size: 14px;
  color: ${({ theme }) => theme.color.fontColor};
`;

const StUserDefaultImage = styled(DefaultUserImage)`
  width: 22px;
  height: 22px;
`;

export default PreviousDesignPortfolioItem;
