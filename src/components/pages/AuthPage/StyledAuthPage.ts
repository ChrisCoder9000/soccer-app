import { Colors } from "@/constants/Colors";
import styled from "styled-components";

export const StyledAuthPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25rem;

    h2 {
      font-size: 4rem;
      color: ${Colors.primary600};
      background-image: linear-gradient(
        to bottom right,
        ${Colors.primary500},
        ${Colors.primary600}
      );
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }

    .inner-wrapper {
      margin-top: 2rem;
      width: 100%;

      .switch-wrapper {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin: 1rem;

        p {
          font-size: 0.9rem;
          font-weight: 500;
          color: ${Colors.primary600};
          margin-right: 1rem;
          transform: translateY(0.1rem);
        }
      }

      .error-text {
        font-size: 0.8rem;
        max-width: 100%;
        margin: 1rem;
        color: ${Colors.red1};
        text-align: center;
      }

      .buttons-wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 1rem;
        align-items: center;

        .authmode-switcher {
          margin: 0.5rem;
          text-align: center;
          color: ${Colors.primary600};
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease-in-out;

          &:hover {
            color: ${Colors.primary500};
          }
        }
      }
    }
  }
`;
