import "./App.css";
import { useEffect, useState } from "react";

const IMAGE_LIST = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "11.png",
  "11.png",
  "11.png",
  "11.png",
  "11.png",
  "11.png",
];

type Dot = { size: number; current: boolean };
function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indicator, setIndicator] = useState<Dot[]>([]);
  const [offset, setOffset] = useState(24);

  console.log(offset);

  useEffect(() => {
    initializeIndicator();
  }, []);

  const initializeIndicator = () => {
    const indicator: Dot[] = [];
    if (IMAGE_LIST.length <= 5) {
      IMAGE_LIST.forEach((_, idx) =>
        indicator.push({ size: 3, current: idx === 0 }),
      );
    } else {
      IMAGE_LIST.forEach((_, idx) =>
        indicator.push({
          size: idx < 3 ? 3 : idx > 4 ? 0 : 5 - idx,
          current: idx === 0,
        }),
      );
    }

    setIndicator(indicator);
  };

  const goPrevious = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) return;
    setCurrentIndex(prevIndex);
    if (indicator[prevIndex].size === 3) {
      setIndicator((prev) =>
        prev.map((elem, idx) =>
          idx === prevIndex
            ? { ...elem, current: true }
            : { ...elem, current: false },
        ),
      );
    } else {
      setOffset((prev) => prev + 12);
      setIndicator((prev) => {
        const newIndicator = [...prev];
        newIndicator.shift();
        newIndicator.push({
          size:
            newIndicator[newIndicator.length - 1].size === 3
              ? 2
              : newIndicator[newIndicator.length - 1].size === 2
                ? 1
                : 0,
          current: false,
        });
        return newIndicator;
      });
    }
  };

  const goNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex > indicator.length - 1) return;
    setCurrentIndex(nextIndex);
    if (indicator[nextIndex].size === 3) {
      setIndicator((prev) =>
        prev.map((elem, idx) =>
          idx === nextIndex
            ? { ...elem, current: true }
            : { ...elem, current: false },
        ),
      );
    } else {
      setOffset((prev) => prev - 12);
      setIndicator((prev) => {
        const newIndicator = [...prev];
        newIndicator.pop();
        newIndicator.unshift({
          size:
            newIndicator[0].size === 3 ? 2 : newIndicator[0].size === 2 ? 1 : 0,
          current: false,
        });
        return newIndicator;
      });
    }
  };

  return (
    <>
      <main>
        <section className="photo-area">
          <div
            className="slider"
            style={{
              left: -currentIndex * window.innerWidth,
            }}
          >
            {IMAGE_LIST.map((filename) => {
              return (
                <figure
                  style={{
                    background: `url(/images/${filename}) center / cover no-repeat`,
                  }}
                />
              );
            })}
          </div>
          {currentIndex > 0 && (
            <button className="navigator previous" onClick={goPrevious}>
              <img src="/images/chevron-left.svg" alt="이전 이미지 버튼" />
            </button>
          )}
          {currentIndex < IMAGE_LIST.length - 1 && (
            <button className="navigator next" onClick={goNext}>
              {<img src="/images/chevron-right.svg" alt="다음 이미지 버튼" />}
            </button>
          )}
        </section>
        <section className="indicator">
          <div
            className="dots-container"
            style={{
              width: IMAGE_LIST.length > 5 ? "56px" : "auto",
              left: IMAGE_LIST.length > 5 ? `calc(50% + ${offset}px)` : `50%`,
              transform:
                IMAGE_LIST.length > 5
                  ? "translateX(calc(-50% - 12px))"
                  : "translateX(-50%)",
            }}
          >
            {indicator.map((elem, idx) => (
              <div key={idx.toString()} className="dot-container">
                <div
                  className={`dot ${elem.current ? "current" : ""}`}
                  style={{
                    width:
                      elem.size === 3
                        ? "8px"
                        : elem.size === 2
                          ? "6px"
                          : elem.size === 1
                            ? "4px"
                            : "0px",
                    height:
                      elem.size === 3
                        ? "8px"
                        : elem.size === 2
                          ? "6px"
                          : elem.size === 1
                            ? "4px"
                            : "0px",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
