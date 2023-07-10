import {Wrapper, Flex, Desktop, Mobile, DesktopName, MobileName} from "../styled/Playground";

const example = [
  {
    name: "blabla1",
  },
  {
    name: "blabla2",
  },
  {
    name: "blabla3",
  }, {
        name: "blabla4",
    }, {
        name: "blabla5",
    }, {
        name: "blabla6",
    }, {
        name: "blabla7",
    },
];

const Playground = () => {
  return <Wrapper>
      {example.map((item, idx) => {
          return <Flex reversed={idx % 2 ? "row-reverse" : "row"}>
                <Desktop>
                    <DesktopName>{item.name}</DesktopName>
                </Desktop>
                <Mobile>
                    <MobileName>{item.name}</MobileName>
                </Mobile>
          </Flex>
      })}
  </Wrapper>;
};

export default Playground;
