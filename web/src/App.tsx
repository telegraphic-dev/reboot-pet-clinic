import { FormEvent, useState } from "react";
import { useSignIn, useSignOut } from "@reboot-dev/reboot-react";
import { useClinic, useOwner, usePet } from "./api/petclinic/v1/petclinic_rbt_react";

const clinicId = "petclinic";

type Notice = { kind: "error" | "success"; text: string } | null;

function messageFrom(result: { aborted?: { message?: string } }): string {
  return result.aborted?.message ?? "The request could not be completed.";
}

function OwnerDetails({ ownerId, onSelectPet }: { ownerId: string; onSelectPet: (id: string) => void }) {
  const owner = useOwner({ id: ownerId });
  const { response, isLoading, aborted } = owner.useDetails();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  if (isLoading) return <section className="panel">Loading owner…</section>;
  if (aborted || !response?.owner) return <section className="panel error">{aborted?.message ?? "Owner not found."}</section>;

  const details = response;
  const ownerCard = details.owner!;
  async function updateOwner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await owner.update({
      firstName: String(data.get("firstName")), lastName: String(data.get("lastName")),
      address: String(data.get("address")), city: String(data.get("city")), telephone: String(data.get("telephone")),
    });
    setNotice(result.response ? { kind: "success", text: "Owner saved." } : { kind: "error", text: messageFrom(result) });
    if (result.response) setEditing(false);
  }

  async function addPet(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await owner.addPet({ name: String(data.get("name")), petType: String(data.get("petType")), birthday: String(data.get("birthday")) });
    if (result.response) {
      event.currentTarget.reset();
      onSelectPet(result.response.petId);
      setNotice({ kind: "success", text: "Pet added." });
    } else setNotice({ kind: "error", text: messageFrom(result) });
  }

  return <section className="panel owner-details">
    <div className="panel-heading"><div><p className="eyebrow">Owner record</p><h2>{ownerCard.firstName} {ownerCard.lastName}</h2><p>{details.address}, {details.city} · {ownerCard.phone}</p></div><button className="secondary" onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit owner"}</button></div>
    {notice && <p className={`notice ${notice.kind}`}>{notice.text}</p>}
    {editing && <form className="form-grid" onSubmit={updateOwner}>
      <label>First name<input name="firstName" defaultValue={ownerCard.firstName} required /></label><label>Last name<input name="lastName" defaultValue={ownerCard.lastName} required /></label>
      <label>Address<input name="address" defaultValue={details.address} required /></label><label>City<input name="city" defaultValue={details.city} required /></label><label>Telephone<input name="telephone" defaultValue={ownerCard.phone} required /></label>
      <button>Save owner</button>
    </form>}
    <div className="section-heading"><h3>Pets</h3><span>{details.pets.length}</span></div>
    <div className="cards">{details.pets.map((pet) => <button className="pet-card" key={pet.petId} onClick={() => onSelectPet(pet.petId)}><strong>{pet.name}</strong><span>{pet.petType} · {pet.birthday}</span></button>)}</div>
    <form className="form-grid compact" onSubmit={addPet}><h3>Add a pet</h3><label>Name<input name="name" required /></label><label>Type<input name="petType" placeholder="Dog, cat…" required /></label><label>Birthday<input name="birthday" type="date" required /></label><button>Add pet</button></form>
  </section>;
}

function PetDetails({ petId }: { petId: string }) {
  const pet = usePet({ id: petId });
  const { response, isLoading, aborted } = pet.useDetails();
  const [notice, setNotice] = useState<Notice>(null);
  if (isLoading) return <section className="panel">Loading pet…</section>;
  if (aborted || !response?.pet) return <section className="panel error">{aborted?.message ?? "Pet not found."}</section>;
  async function recordVisit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await pet.recordVisit({ visitDate: String(data.get("visitDate")), description: String(data.get("description")) });
    if (result.response) { event.currentTarget.reset(); setNotice({ kind: "success", text: "Visit recorded." }); } else setNotice({ kind: "error", text: messageFrom(result) });
  }
  return <section className="panel"><p className="eyebrow">Pet record</p><h2>{response.pet.name}</h2><p>{response.pet.petType} · Born {response.pet.birthday}</p>{notice && <p className={`notice ${notice.kind}`}>{notice.text}</p>}
    <div className="section-heading"><h3>Visit history</h3><span>{response.visits.length}</span></div><ul className="visits">{response.visits.map((visit, index) => <li key={`${visit.visitDate}-${index}`}><strong>{visit.visitDate}</strong><span>{visit.description}</span></li>)}</ul>
    <form className="form-grid compact" onSubmit={recordVisit}><h3>Record visit</h3><label>Date<input name="visitDate" type="date" required /></label><label className="wide">Description<input name="description" required /></label><button>Record visit</button></form>
  </section>;
}

export default function App() {
  const signIn = useSignIn();
  const signOut = useSignOut();
  const [signingIn, setSigningIn] = useState(false);
  const clinic = useClinic({ id: clinicId });
  const [query, setQuery] = useState("");
  const [selectedOwner, setSelectedOwner] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const owners = clinic.useSearchOwners({ query, limit: 100 });
  const veterinarians = clinic.useListVeterinarians();

  async function createOwner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const result = await clinic.createOwner({ firstName: String(data.get("firstName")), lastName: String(data.get("lastName")), address: String(data.get("address")), city: String(data.get("city")), telephone: String(data.get("telephone")) });
    if (result.response) { event.currentTarget.reset(); setSelectedOwner(result.response.ownerId); setSelectedPet(null); setNotice({ kind: "success", text: "Owner created." }); } else setNotice({ kind: "error", text: messageFrom(result) });
  }
  async function addVeterinarian(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const specialties = String(data.get("specialties")).split(",").map((value) => value.trim()).filter(Boolean);
    const result = await clinic.addVeterinarian({ firstName: String(data.get("firstName")), lastName: String(data.get("lastName")), specialties });
    if (result.response) { event.currentTarget.reset(); setNotice({ kind: "success", text: "Veterinarian added." }); } else setNotice({ kind: "error", text: messageFrom(result) });
  }

  const authFailure = [owners.aborted?.message, veterinarians.aborted?.message].some((message) => message?.includes("Unauthenticated") || message?.includes("PermissionDenied"));
  if (authFailure) return <main><section className="panel"><p className="eyebrow">PetClinic</p><h1>Sign in required</h1><p>Your session is missing or has expired. Sign in to access clinic records.</p><button disabled={signingIn} onClick={() => { setSigningIn(true); void signIn().catch(() => setSigningIn(false)); }}>{signingIn ? "Redirecting…" : "Sign in with Google"}</button></section></main>;

  return <main><header><div><p className="eyebrow">PetClinic</p><h1>Practice desk</h1><p>Owners, pets, visits, and the clinical team — one sane screen.</p></div><div className="status">{owners.isLoading || veterinarians.isLoading ? "Syncing…" : "Connected"}</div><button className="secondary" onClick={() => void signOut()}>Sign out</button></header>
    {notice && <p className={`notice ${notice.kind}`}>{notice.text}</p>}
    <div className="layout"><aside className="sidebar"><section className="panel"><h2>Find owners</h2><input aria-label="Find owners" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search first or last name" />{owners.aborted && <p className="error">{owners.aborted.message}</p>}<div className="owner-list">{owners.response?.owners.map((owner) => <button key={owner.ownerId} className={owner.ownerId === selectedOwner ? "selected" : ""} onClick={() => { setSelectedOwner(owner.ownerId); setSelectedPet(null); }}><strong>{owner.firstName} {owner.lastName}</strong><span>{owner.phone}</span></button>)}</div></section>
      <section className="panel"><h2>New owner</h2><form className="form-grid" onSubmit={createOwner}><label>First name<input name="firstName" required /></label><label>Last name<input name="lastName" required /></label><label>Address<input name="address" required /></label><label>City<input name="city" required /></label><label>Telephone<input name="telephone" required /></label><button>Create owner</button></form></section></aside>
      <div className="content">{selectedOwner ? <OwnerDetails ownerId={selectedOwner} onSelectPet={setSelectedPet} /> : <section className="empty">Select an owner, or create one to get started.</section>}{selectedPet && <PetDetails petId={selectedPet} />}
      <section className="panel"><div className="panel-heading"><div><p className="eyebrow">Clinical team</p><h2>Veterinarians</h2></div><span>{veterinarians.response?.veterinarians.length ?? 0}</span></div><div className="cards">{veterinarians.response?.veterinarians.map((vet) => <div className="vet-card" key={vet.veterinarianId}><strong>Dr. {vet.firstName} {vet.lastName}</strong><span>{vet.specialties.length ? vet.specialties.join(" · ") : "General practice"}</span></div>)}</div><form className="form-grid compact" onSubmit={addVeterinarian}><h3>Add veterinarian</h3><label>First name<input name="firstName" required /></label><label>Last name<input name="lastName" required /></label><label className="wide">Specialties<input name="specialties" placeholder="Surgery, dentistry" /></label><button>Add veterinarian</button></form></section></div></div>
  </main>;
}
