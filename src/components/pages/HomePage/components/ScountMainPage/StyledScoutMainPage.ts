import { Colors } from "@/constants/Colors";
import { Borders } from "@/constants/Dimens";
import styled from "styled-components";

export const StyledScountMainPage = styled.div`
  margin-inline: 3rem;

  .menu {
    position: fixed;
    top: 0;
    left: 50%;
    right: 50%;
    padding: 0.5rem;
    margin: 1rem;
    background-color: ${Colors.secondary300}AA;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    border-radius: ${Borders.radius2};
    width: fit-content;
    z-index: 100;
    transform: translateX(-50%);

    .search {
      margin-inline: 1rem;
      display: flex;
      align-items: center;

      input[type="text"] {
        border: none;
        outline: none;
        background-color: ${Colors.primary300}AA;
        backdrop-filter: blur(5px);
        padding: 0.6rem 1.3rem;
        border-radius: ${Borders.radius1};
        font-family: inherit;
        font-size: 0.7rem;
      }

      p {
        margin-left: 0.8rem;
        margin-right: 2rem;
        font-size: 0.9rem;
        color: ${Colors.secondary600};
        font-weight: 600;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          transform: scale(1.02);
          color: ${Colors.secondary500};
        }
      }
    }

    .logout {
      display: flex;
      align-items: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        transform: scale(1.1);
      }

      img {
        width: 3rem;
        height: 3rem;
        background-color: ${Colors.secondary600};
        padding: 0.8rem;
        border-radius: ${Borders.radius2};
      }
    }
  }

  .cards-list {
    margin: 1rem;
    margin-top: 7rem;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));

    .soccer-card {
      background-color: ${Colors.white1};
      padding: 1.5rem;
      border-radius: ${Borders.radius1};
      box-shadow: 0 0 0.5rem 0.1rem ${Colors.black1}1A;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 1rem 0.2rem ${Colors.black1}16;
      }

      .first-section {
        display: flex;
        align-items: center;

        img {
          width: 3rem;
          height: 3rem;
          padding: 0.5rem;
          background-color: ${Colors.secondary400};
          border-radius: ${Borders.radius1};
          margin-right: 1.5rem;
        }

        .name {
          font-size: 1.3rem;
          font-weight: 400;

          span {
            margin-right: 0.5rem;
            font-size: 0.8rem;
            font-weight: 600;
          }
        }
      }

      .second-section {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 1rem;
          font-weight: 400;

          span {
            margin-right: 0.5rem;
            font-size: 0.7rem;
            font-weight: 600;
          }
        }
      }

      .third-section {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        background-color: ${Colors.black1}19;
        border-radius: ${Borders.radius1};
        overflow: hidden;

        div {
          background-color: ${Colors.secondary500};
          color: ${Colors.white1};
          padding: 0.4rem 0.9rem;
        }

        p {
          margin-left: 1rem;
          font-size: 0.8rem;
          font-weight: 300;
          opacity: 0.6;
        }
      }
    }
  }
`;
