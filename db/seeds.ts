import db from "./index"

const CANDIDATES_DATA = [
  {
    name: "Marissa Williamson",
    email: "marissawilliamson@gmail.com",
    phone: "5551810089",
    step: "Drug Test",
    id: 1,
    time_interview: "2020-06-16T13:46:37.201532Z",
    profile_url: "/resume/mwilliamson-1",
  },
  {
    name: "Ireland Gillespie",
    email: "irelandgillespie@live.com",
    phone: "5555186593",
    step: "Background Check",
    id: 2,
    time_interview: "2020-07-13T13:46:37.201532Z",
    profile_url: "/resume/igillespie-2",
  },
  {
    name: "Amaris Escobar",
    email: "amarisescobar@gmail.com",
    phone: "5557694163",
    step: "Background Check",
    id: 3,
    time_interview: "2020-06-21T13:46:37.201532Z",
    profile_url: "/resume/aescobar-3",
  },
  {
    name: "Judah Norman",
    email: "judahnorman@outlook.com",
    phone: "5551696813",
    step: "",
    id: 4,
    time_interview: "2020-06-14T13:46:37.201532Z",
    profile_url: "/resume/jnorman-4",
  },
  {
    name: "Amanda Avery",
    email: "amandaavery@live.com",
    phone: "5559805632",
    step: "",
    id: 5,
    time_interview: "2020-07-05T13:46:37.201532Z",
    profile_url: "/resume/aavery-5",
  },
  {
    name: "Jovany Rose",
    email: "jovanyrose@gmail.com",
    phone: "5552469198",
    step: "Drug Test",
    id: 6,
    time_interview: "2020-07-08T13:46:37.201532Z",
    profile_url: "/resume/jrose-6",
  },
  {
    name: "Natalia Sullivan",
    email: "nataliasullivan@yahoo.com",
    phone: "5557772117",
    step: "Background Check",
    id: 7,
    time_interview: "2020-06-20T13:46:37.201532Z",
    profile_url: "/resume/nsullivan-7",
  },
  {
    name: "Irene Hammond",
    email: "irenehammond@yahoo.com",
    phone: "5558325188",
    step: "Drug Test",
    id: 8,
    time_interview: "2020-06-26T13:46:37.201532Z",
    profile_url: "/resume/ihammond-8",
  },
  {
    name: "Tyrone Owen",
    email: "tyroneowen@live.com",
    phone: "5559152848",
    step: "Background Check",
    id: 9,
    time_interview: "2020-07-06T13:46:37.201532Z",
    profile_url: "/resume/towen-9",
  },
  {
    name: "Freddy Maddox",
    email: "freddymaddox@gmail.com",
    phone: "5552753372",
    step: "Drug Test",
    id: 10,
    time_interview: "2020-06-14T13:46:37.201532Z",
    profile_url: "/resume/fmaddox-10",
  },
  {
    name: "Simon Parker",
    email: "simonparker@outlook.com",
    phone: "5557939902",
    step: "Paperwork",
    id: 11,
    time_interview: "2020-07-08T13:46:37.201532Z",
    profile_url: "/resume/sparker-11",
  },
  {
    name: "Dawson Davis",
    email: "dawsondavis@yahoo.com",
    phone: "5555120435",
    step: "Drug Test",
    id: 12,
    time_interview: "2020-07-07T13:46:37.201532Z",
    profile_url: "/resume/ddavis-12",
  },
  {
    name: "Carmelo Green",
    email: "carmelogreen@hey.com",
    phone: "5556889718",
    step: "Background Check",
    id: 13,
    time_interview: "2020-06-20T13:46:37.201532Z",
    profile_url: "/resume/cgreen-13",
  },
  {
    name: "Dayana Good",
    email: "dayanagood@hey.com",
    phone: "5554799596",
    step: "Paperwork",
    id: 14,
    time_interview: "2020-06-20T13:46:37.201532Z",
    profile_url: "/resume/dgood-14",
  },
  {
    name: "Jazmin Leonard",
    email: "jazminleonard@hey.com",
    phone: "5551610764",
    step: "Paperwork",
    id: 15,
    time_interview: "2020-07-06T13:46:37.201532Z",
    profile_url: "/resume/jleonard-15",
  },
  {
    name: "Rigoberto Holder",
    email: "rigobertoholder@outlook.com",
    phone: "5558658407",
    step: "",
    id: 16,
    time_interview: "2020-06-14T13:46:37.201532Z",
    profile_url: "/resume/rholder-16",
  },
  {
    name: "Blaine Reese",
    email: "blainereese@yahoo.com",
    phone: "5551304952",
    step: "",
    id: 17,
    time_interview: "2020-07-09T13:46:37.201532Z",
    profile_url: "/resume/breese-17",
  },
  {
    name: "Taylor Jenkins",
    email: "taylorjenkins@hey.com",
    phone: "5556420477",
    step: "Paperwork",
    id: 18,
    time_interview: "2020-06-25T13:46:37.201532Z",
    profile_url: "/resume/tjenkins-18",
  },
  {
    name: "Rolando Daniels",
    email: "rolandodaniels@outlook.com",
    phone: "5550423305",
    step: "Background Check",
    id: 19,
    time_interview: "2020-06-19T13:46:37.201532Z",
    profile_url: "/resume/rdaniels-19",
  },
  {
    name: "Clarence Robbins",
    email: "clarencerobbins@gmail.com",
    phone: "5557400981",
    step: "Paperwork",
    id: 20,
    time_interview: "2020-06-30T13:46:37.201532Z",
    profile_url: "/resume/crobbins-20",
  },
]

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  CANDIDATES_DATA.forEach(async (candidate: any) => {
    await db.candidate.create({
      data: {
        name: candidate.name,
        interviewed_at: candidate.time_interview,
        step: candidate.step,
      },
    })
  })
}

export default seed
