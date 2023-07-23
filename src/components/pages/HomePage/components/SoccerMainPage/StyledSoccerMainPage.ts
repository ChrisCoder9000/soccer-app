import { Colors } from "@/constants/Colors";
import { Borders } from "@/constants/Dimens";
import styled from "styled-components";

export const StyledSoccerMainPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .main-form {
    background-color: ${Colors.white1};
    padding: 2rem;
    border-radius: ${Borders.radius2};
    box-shadow: 0 0 1rem ${Colors.black1}1A;

    h3 {
      width: 100%;
      text-align: center;
      margin-bottom: 1rem;
    }

    .top-wrapper {
      display: grid;
      grid-template-columns: auto auto;
      align-items: center;
      grid-gap: 1rem;
      width: 30rem;

      .account-details {
        p {
          font-size: 0.8rem;
          font-weight: 500;
          opacity: 0.5;

          span {
            font-weight: 600;
            opacity: 0.6;
            font-size: 0.7rem;
            margin-right: 0.5rem;
          }
        }
      }
    }

    .sliders-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 2rem;
      margin-top: 2rem;
      margin-bottom: 2rem;

      .slider {
        p {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
      }
    }
  }

  .success {
    button {
      background-color: ${Colors.green1};
    }
  }

  .fail {
    button {
      background-color: ${Colors.red1};
    }
  }

  .logout-button-wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    .logout-button {
      font-weight: 600;
      font-size: 0.9rem;
      color: ${Colors.primary600};
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: ${Colors.primary500};
      }
    }
  }
`;
