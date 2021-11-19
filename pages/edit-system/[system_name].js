import { useRouter } from 'next/router'
import DbService from '../../lib/db'
import SystemEditor from '../../components/system-editor'
import MainLayout from '../../components/main-layout'
import Head from 'next/head'
import { getSession } from 'next-auth/client';

export default function SystemPage({ system, session }) {
  return (
    <MainLayout session={session}>
      <Head>
        <title>Chronicle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SystemEditor system={system} session={session}></SystemEditor>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { system_name } = context.query;
  const result = await DbService().System.findOne({ name: system_name }).populate('owner').populate('dataModels');
  console.log(JSON.stringify(result.toObject().dataModels));
  const system = DbService().docObjectToSerializable(result.toObject());

  const session = await getSession(context);


  return { props: { system: system, session: session } };
};