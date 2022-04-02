import styled from 'styled-components';
export const Wrapper = styled.aside`
font-family: Arial, Helvetica, sans-serif;   
width: 500px;
padding: 20px;
.active{
    left :0;
    opacity: 1;
    transition: all 0.5s ease;
    z-index: 1;
    text-align :center;
    padding: 2rem;
    width :100%;
    display:table;
    background-color: #0d6efd;
    color:rgb(255, 255, 255);
    border-radius: 1em;
}
`;