import Link from "next/link";
import { v4 as uuid } from "uuid";

export default function Tournaments() {
  return <Link href={`/tournaments/${uuid()}`}>Create New Tournament</Link>;
}
