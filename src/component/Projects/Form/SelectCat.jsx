
export default function SelectCat({value,handleChange}) {
  return (
    <div className="inputContainer flex flex-col gap-2 w-full ">
    <h3 className=" text-lg font-semibold">Project Category :</h3>
    <select value={value} name='category' onChange={handleChange} className=' duration-200 outline-0 bg-[#333333] p-[6px] border-2 border-[#454545] rounded-lg '>
    <option value="">Select Category</option>

<optgroup label="Development">
  <option value="frontend">Frontend Development</option>
  <option value="backend">Backend Development</option>
  <option value="fullstack">Full-Stack Development</option>
  <option value="mobile">Mobile App Development</option>
  <option value="game">Game Development</option>
  <option value="embedded">Embedded Systems</option>
</optgroup>

<optgroup label="Technologies & Frameworks">
  <option value="webdev">Web Development (React, Angular, Vue.js)</option>
  <option value="backend-fw">Backend Frameworks (Node.js, Django, Spring Boot, Laravel)</option>
  <option value="database">Database Management (SQL, NoSQL, PostgreSQL, MongoDB)</option>
  <option value="cloud">Cloud & DevOps (AWS, Azure, Docker, Kubernetes)</option>
  <option value="ai-ml">AI & Machine Learning (TensorFlow, OpenAI, PyTorch)</option>
</optgroup>

<optgroup label="Software Engineering Fields">
  <option value="cybersecurity">Cybersecurity</option>
  <option value="data-science">Data Science & Analytics</option>
  <option value="blockchain">Blockchain Development</option>
  <option value="iot">Internet of Things (IoT)</option>
  <option value="ar-vr">Augmented & Virtual Reality (AR/VR)</option>
</optgroup>

<optgroup label="Business & Management">
  <option value="project-mgmt">Project Management</option>
  <option value="ui-ux">Product Design & UI/UX</option>
  <option value="qa-testing">Quality Assurance (QA & Testing)</option>
  <option value="it-support">Technical Support & IT Services</option>
</optgroup>

<optgroup label="Other">
  <option value="freelance">Freelance & Consulting</option>
  <option value="r-d">Research & Development (R&D)</option>
  <option value="opensource">Open Source Contributions</option>
</optgroup>
    </select>
  </div>
  )
}
