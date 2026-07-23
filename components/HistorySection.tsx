"use client";

// 연혁 섹션의 접힘과 펼침 인터랙션을 관리합니다.
import { useState } from "react";
import { historyGroups } from "./historyData";
import styles from "./HistorySection.module.css";

export function HistorySection() {
  const [openRange, setOpenRange] = useState<string | null>(null);

  return (
    <section id="history" className={styles.section} aria-label="연혁">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>HISTORY</p>
        <h2>연혁</h2>
        <div className={styles.groups}>
          {historyGroups.map((group) => {
            const isOpen = openRange === group.range;

            return (
              <article className={`${styles.group} ${isOpen ? styles.open : ""}`} key={group.range}>
                <div className={styles.range}>{group.range}</div>
                <div className={styles.timeline}>
                  {group.years.map((year) => (
                    <div className={styles.yearRow} key={year.year}>
                      <div className={styles.year}>
                        <span>{year.year}</span>
                      </div>
                      <ul>
                        {year.items.map((item, itemIndex) => {
                          const itemClassName = item.featured
                            ? styles.featured
                            : isOpen
                              ? styles.detailVisible
                              : undefined;

                          return (
                            <li className={itemClassName} key={`${year.year}-${itemIndex}`}>
                              <span>{item.text}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <button
                  className={styles.toggle}
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenRange(isOpen ? null : group.range)}
                >
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  {isOpen ? "주요항목만 보기" : "전체보기"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
