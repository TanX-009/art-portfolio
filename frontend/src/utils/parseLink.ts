export default function parseLink(link: string) {
  return process.env.NEXT_PUBLIC_SERVER_API_URL + link;
}
