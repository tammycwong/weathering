import Head from "next/head";
import SearchBox from "../components/SearchBox"

export default function Home() {
  return (
    <div>
      <Head>
        <title>How is it weather?</title>
      </Head>
      <h1>How is it weathering?</h1>
      <div className="home">
        <div className="container">
          <SearchBox />

        </div>
      </div>
    </div>
  );
}
