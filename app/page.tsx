import AddRepoForm from "@/components/AddRepoForm";
import Header from "@/components/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AddRepoForm />
    </div>
  );
}
