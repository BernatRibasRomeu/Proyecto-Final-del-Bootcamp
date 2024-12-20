import React, { useState } from "react";
import axios from "axios";
import { AdoptionForm } from "../components/PutAdoption/AdoptionForm"
import { Toaster } from "../components/ui/Sonner"

const PutAdoption: React.FC = () => {
  return (
    <>
      <AdoptionForm />
      <Toaster />
    </>
  )
}
export default PutAdoption;