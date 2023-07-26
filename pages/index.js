import Head from 'next/head'
import NavBar from '../components/NavBar'
import { Container } from 'react-bootstrap'
import Footer from '../components/Footer'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ConfigForm } from '../components/ConfigForm';
import { RunA11yScan } from '../components/RunA11yScan';
import { AllResults } from '../components/AllResults';
import Loader from "../components/Loader";
import { useState } from 'react';
import { Jumbotron } from '../components/Jumbotron';
import { A11Y_PAGE_TITLE, A11Y_TAB_TITLE } from '../common/messages';

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [tabChanged, setTabChanged] = useState(false);
  const [pageTitle, setPageTitle] = useState(A11Y_PAGE_TITLE.HOME)
  return (
    <div className={''}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='h-100'>
        <header>
          <NavBar />
        </header>
        <main className="mb-4">
          <Jumbotron />
          <Container fluid="md" className="mt-4">
            <Tabs
              id="home-page-tab"
              defaultActiveKey="configForm"
              className="mb-4 fs-5"
              fill
              onSelect={(e)=> {
                let pT = A11Y_PAGE_TITLE.HOME;
                if(e == 'allResults') {
                  pT = A11Y_PAGE_TITLE.SCAN_RESULTS;
                  setTabChanged(Math.random());
                }else if(e=='runScan'){
                  pT =A11Y_PAGE_TITLE.RUN_SCAN;
                }
                setPageTitle(pT);
              }}>
              <Tab eventKey="configForm" title={A11Y_TAB_TITLE.CONFIG_FORM}>
                <ConfigForm showLoader={setShowLoader} />
              </Tab>
              <Tab eventKey="runScan" title={A11Y_TAB_TITLE.RUN_SCAN}>
                <RunA11yScan showLoader={setShowLoader} />
              </Tab>
              <Tab eventKey="allResults" title={A11Y_TAB_TITLE.SCAN_RESULTS}>
                <AllResults isTabChanged={tabChanged} showLoader={setShowLoader} />
              </Tab>
            </Tabs>
          </Container>
        </main>
      </div>
      <Footer />
      <Loader show={showLoader} />
    </div>
  )
}