import TrashBinImage from "../features/trash-bin/TrashBinImage";
import BinLogTable from "../features/bin-logs/BinLogTable";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import styled from "styled-components";
import { HiOutlineTrash } from "react-icons/hi2";
import { format } from "date-fns";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
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
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
        props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
        props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// Page component
const TrashBinPage = () => {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const levels = [10, 45, 70, 100];

    return (
        <div>
            <StyledBookingDataBox>
                <Header>
                    <div>
                        <HiOutlineTrash />
                        <p>Real-time updates</p>
                    </div>

                    <p>
                        Data as of <strong>{format(new Date(), "EEE, MMM dd yyyy")}</strong>
                    </p>
                </Header>

                <Section>
                    <div className="main-wrapper">
                        <div className="trash-bin-flex">
                            {levels.map((level, index) => (
                                <TrashBinImage key={index} level={level} />
                            ))}
                        </div>
                    </div>

                </Section>

                <Footer></Footer>
            </StyledBookingDataBox>

            <br />

            <BinLogTable date={queryDate} />
        </div>
    );
};

export default TrashBinPage;
