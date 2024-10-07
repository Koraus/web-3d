import { Card } from "./components/card";
import ghCover from "./assets/img/gh-cover.png";
import gameCover from "./assets/img/game-cover.jpg";
import phoneBookCover from "./assets/img/phone-book-cover.png";
import choicieCover from "./assets/img/choicie-cover.png";

export const Section2 = () => {
    return <section>
        <div className="card-list" >
            <Card
                img={ghCover}
                imgAlt="github"
                title="github"
                subtitle="my github"
                link="https://github.com/Koraus"
            />
            <Card
                img={gameCover}
                imgAlt="game"
                title="game"
                subtitle="r3f, TS, React, Recoil"
                link="https://koraus.github.io/connect-colors/"
            />
            <Card
                img={phoneBookCover}
                imgAlt="phone book"
                title="PhoneBook"
                subtitle="vue"
                link="https://koraus.github.io/PhoneBook-Web/"
            />

            <Card
                img={choicieCover}
                imgAlt="choicie"
                title="choicie"
                subtitle="vue"
                link="https://koraus.github.io/choicie-web"
            />
        </div>
    </section>
};