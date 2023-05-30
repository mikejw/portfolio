
import styled from '@emotion/styled';

export const Wrapper = styled.div`

  section {
    border-bottom: 1px solid #ccc;
  }
  section ul {
    margin: 0;
    padding: 0.5rem 2em;
    background-color: #eee;
  }

  p label, p input {
    display: block;
  }

  h1 {
    font-size: 2rem;
    text-transform: uppercase;
    text-align: center;
    margin-top: 4.5rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  h4 {
    font-size: 1rem;
  }

  p, ul li {
    font-size: 1rem;
    margin-bottom: 15px;
    word-wrap: break-word;
    font-weight: 400;
    line-height: 1.4;
  }

  a {
    color: #000;
  }

  .content {
    min-height: 40vh;
    margin-top: 3rem;
    padding: 0 3.5% 0.5rem 3.5%;

    table {
      width: 100%;
      margin: 0;
    }
    table tr td {
      width: 80%;
    }
    table tr td:first-of-type {
      padding-right: 2rem;
      width: 20%;
      h3 {
        text-align: right;
      }
    }

    .video-container {
      margin-top: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      div {
        width: 98%;
      }
    }

  }
`;
