import { useRouter } from 'next/router'
import DbService from '../../lib/db'
import SystemViewer from '../../components/system-viewer'
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
      <SystemViewer system={system} session={session}></SystemViewer>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { system_name } = context.query;
  const result = await DbService().System.findOne({ name: system_name }).populate('owner').populate('dataModels');
  const system = DbService().docObjectToSerializable(result.toObject());

  const session = await getSession(context);

  return { props: { system: system, session: session } };
};