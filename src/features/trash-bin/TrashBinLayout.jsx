import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi2";
import { format } from "date-fns";
import TrashBinImage from "../trash-bin/TrashBinImage";
import { useBinMonitoring } from "./useBinMonitoring";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Heading from "../../ui/Heading";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  border: 1px solid #e5e7eb;

  overflow: hidden;
`;

const Header = styled.header`
  padding: 2rem 4rem;
  color: #374151;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem;
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// Page component
const TrashBinLayout = () => {
  const { isLoading, data } = useBinMonitoring();

  if (isLoading) return <Spinner />;
  if (!data.length) return <Empty resourceName="bin_logs" />;

  return (
    <div>
      <StyledBookingDataBox>
        <Header>
          <div>
            <HiOutlineTrash />
            <Heading as="h2">
              Real-time updates
            </Heading>
          </div>

          <Heading as="h2">
            Data as of <strong>{format(new Date(), "EEE, MMM dd yyyy")}</strong>
          </Heading>
        </Header>

        <Section>
          <div className="main-wrapper">
            <div className="trash-bin-flex">
              {[...data]
                .sort((a, b) => a.bin.localeCompare(b.bin))
                .map((d) => (
                  <TrashBinImage key={d.bin} name={d.bin} level={d.value} />
                ))}
            </div>
          </div>
        </Section>

        <Footer></Footer>
      </StyledBookingDataBox>
    </div>
  );
};

export default TrashBinLayout;
