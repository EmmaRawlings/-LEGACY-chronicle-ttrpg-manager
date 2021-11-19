import Head from 'next/head'
import MainLayout from '../components/main-layout'
import SystemBrowser from '../components/system-browser.js'
import DbService from '../lib/db'
import { getSession } from 'next-auth/client';

export default function Home({ publicSystems, mySystems, session }) {
  return (
    <MainLayout session={session}>
      <Head>
        <title>Chronicle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SystemBrowser publicSystems={publicSystems} mySystems={mySystems} session={session}></SystemBrowser>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const psResult = await DbService().System.find({ privacy: 'public' }).populate('owner').populate('dataModels');
  const publicSystems = psResult.map((doc) => {
    return DbService().docObjectToSerializable(doc.toObject());
  })

  const session = await getSession(context);

  var mySystems;
  if (session) {
    const msResult = await DbService().System.find({ owner: session.user._id }).populate('owner').populate('dataModels');
    mySystems = msResult.map((doc) => {
      return DbService().docObjectToSerializable(doc.toObject());
    });
  } else {
    mySystems = [];
  }


  return { props: { publicSystems: publicSystems, mySystems: mySystems, session: session } };
};

// example of getServerSideProps
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/pages/index.js