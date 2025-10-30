import BackButton from "@/components/BackButton";
import { JobUpdatingForm } from "@/components/job-update-form";
import UpdateJobPageSkelection from "@/components/skelections/UpdateJobPageSkelection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useApiQuery } from "@/hooks/useApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { refetch, data, isLoading, error } = useApiQuery<{ data: any }>({
    url: `/job/${id}/details`,
    queryKey: ["job-details", id],
    enabled: true,
  });
  const toggleDeleteModal = (value) => {
    setOpenDeleteModal(value);
  };
  const goBack = () => {
    navigate(-1); // 1 step back in history
  };

  if (isLoading) {
    return <UpdateJobPageSkelection />;
  }
  return (
    <>
      <Dialog open={openDeleteModal} onOpenChange={toggleDeleteModal}>
        <DialogContent>
          <h1>delet job-post</h1>
          <Button variant="destructive">Delete Job</Button>
        </DialogContent>
      </Dialog>
      <div className="space-y-4">
        <BackButton title="Back Job Details" />
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Update your Job Post Data</h1>
          <Button
            variant="destructive"
            type="button"
            onClick={() => toggleDeleteModal(true)}
          >
            Delete Job
          </Button>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <JobUpdatingForm jobPostingValues={data?.data} jobId={id} />
        </div>
      </div>
    </>
  );
};

export default UpdateJobPage;
