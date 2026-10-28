/**
 * Portfolio entries are based on the files currently present in
 * `public/assignments/{ISA,ESE,Extras}/`.
 */

export interface FileAttachment {
  name: string
  path: string
  size: number
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'image'
  label?: string
}

export interface ExternalLink {
  label: string
  url: string
}

export interface DeliverableDetail {
  id: string
  label: string
  type: 'report' | 'spreadsheet' | 'presentation' | 'poster' | 'case_study' | 'research_paper' | 'notes' | 'link'
  fileName?: string
  completed: boolean
}

export interface Assignment {
  id: string
  number: number
  title: string
  category: 'ISA' | 'ESE' | 'Extras'
  date: string
  description: string
  submitted: boolean
  deliverables: DeliverableDetail[]
  files: FileAttachment[]
  links: ExternalLink[]
  tags: string[]
}

type AssignmentFile = Omit<FileAttachment, 'path'>

function createAssignment(
  id: string,
  number: number,
  category: Assignment['category'],
  title: string,
  description: string,
  files: AssignmentFile[],
  tags: string[],
): Assignment {
  const attachments = files.map((file) => ({
    ...file,
    path: `/assignments/${category}/${file.name}`,
  }))

  return {
    id,
    number,
    title,
    category,
    date: '',
    description,
    submitted: true,
    deliverables: attachments.map((file, index) => ({
      id: `${id}-file-${index + 1}`,
      label: file.label ?? file.name,
      type: file.type === 'xlsx'
        ? 'spreadsheet'
        : file.type === 'pptx'
          ? 'presentation'
          : file.type === 'image'
            ? 'poster'
            : 'report',
      fileName: file.name,
      completed: true,
    })),
    files: attachments,
    links: [],
    tags,
  }
}

export const ASSIGNMENTS: Assignment[] = [
  createAssignment(
    'isa-01',
    1,
    'ISA',
    'E-Waste Course Orientation',
    'An introduction to the course structure and its core themes in electronic waste management.',
    [
      {
        name: 'EWEM_Assignment0 (1).docx',
        size: 67514,
        type: 'docx',
        label: 'Course orientation document',
      },
    ],
    ['Course overview', 'E-waste'],
  ),
  createAssignment(
    'isa-02',
    2,
    'ISA',
    'E-Waste in India: Scenario Comparison',
    'A comparative overview of the e-waste situation in India, presented as a course submission.',
    [
      {
        name: 'E waste India Scenario_Comparison.pdf',
        size: 1884162,
        type: 'pdf',
        label: 'India scenario comparison',
      },
    ],
    ['India', 'Scenario comparison'],
  ),
  createAssignment(
    'isa-03',
    3,
    'ISA',
    'E-Waste Management: Class Notes',
    'Classroom material covering e-waste management and environmental contamination.',
    [
      {
        name: 'Class Task_Upload the Write up done in Class 1.pdf',
        size: 386295,
        type: 'pdf',
        label: 'In-class write-up',
      },
      {
        name: 'file_00000000737c81f593d0d62b852e8a1b.png',
        size: 2202352,
        type: 'image',
        label: 'Handwritten e-waste management notes',
      },
    ],
    ['Class notes', 'Environmental impact'],
  ),
  createAssignment(
    'isa-04',
    4,
    'ISA',
    'Karnataka E-Waste: Companies and Tracking',
    'A set of Karnataka-focused company research, tracking material and presentations on e-waste management.',
    [
      {
        name: 'Shreyank_Parab_Karnataka_E_Waste_Companies.docx',
        size: 47955,
        type: 'docx',
        label: 'Karnataka e-waste companies',
      },
      {
        name: 'Karnataka_EWaste_Tracker_2025.xlsx',
        size: 62485,
        type: 'xlsx',
        label: 'Karnataka e-waste tracker',
      },
      {
        name: 'Karnataka E-Waste Report.pptx',
        size: 119502,
        type: 'pptx',
        label: 'Karnataka e-waste report presentation',
      },
      {
        name: 'Karnataka E-Waste PPT.pptx',
        size: 119505,
        type: 'pptx',
        label: 'Karnataka e-waste presentation',
      },
    ],
    ['Karnataka', 'Companies', 'Tracking'],
  ),
  createAssignment(
    'isa-05',
    5,
    'ISA',
    'Ideas for E-Waste Management',
    'A presentation of ideas and approaches for improving e-waste management.',
    [
      {
        name: 'Novel_E-Waste-Management-Ideas.pptx',
        size: 7142918,
        type: 'pptx',
        label: 'E-waste management ideas presentation',
      },
    ],
    ['Ideas', 'E-waste management'],
  ),
  createAssignment(
    'ese-01',
    6,
    'ESE',
    'E-Waste Awareness Poster',
    'A visual submission for communicating e-waste awareness.',
    [
      {
        name: 'WhatsApp Image 2026-09-07 at 12.23.13 PM.jpeg',
        size: 221944,
        type: 'image',
        label: 'E-waste awareness poster',
      },
    ],
    ['Awareness', 'Poster'],
  ),
  createAssignment(
    'ese-02',
    7,
    'ESE',
    'E-Waste Rules and Company Compliance',
    'A review of company compliance under e-waste rules, alongside a supporting EPR calculation report.',
    [
      {
        name: 'EWaste_Rules_Company_Compliance.pdf',
        size: 97237,
        type: 'pdf',
        label: 'Company compliance review',
      },
      {
        name: 'EWaste_EPR_Calculator_Report.PDF',
        size: 120425,
        type: 'pdf',
        label: 'EPR calculator report',
      },
    ],
    ['E-waste rules', 'Compliance', 'EPR'],
  ),
  createAssignment(
    'ese-03',
    8,
    'ESE',
    'Green Buildings: LEED Characteristics and Scores',
    'Course material on LEED characteristics and a scoring workbook for green buildings in India.',
    [
      {
        name: 'LEED_Characteristics_and_Top_10_Green_Buildings_India.docx',
        size: 53326,
        type: 'docx',
        label: 'LEED characteristics and Indian green buildings',
      },
      {
        name: 'Indian_Green_Buildings_LEED_Detailed_Factor_Scores-1 (1).xlsx',
        size: 20975,
        type: 'xlsx',
        label: 'Green buildings LEED factor scores',
      },
    ],
    ['LEED', 'Green buildings', 'India'],
  ),
  createAssignment(
    'ese-04',
    9,
    'ESE',
    'Personal Carbon Footprint',
    'A visual record of a carbon footprint calculation.',
    [
      {
        name: 'carbon_footprint (1).jpeg',
        size: 56958,
        type: 'image',
        label: 'Carbon footprint calculation',
      },
    ],
    ['Carbon footprint', 'Emissions'],
  ),
  createAssignment(
    'ese-05',
    10,
    'ESE',
    'E-Waste Rules in Europe: Five-Country Comparison',
    'A comparative study of e-waste regulations across five European countries.',
    [
      {
        name: 'Europe_EWaste_Rules_Comparison_5_Countries (1).docx',
        size: 53160,
        type: 'docx',
        label: 'European rules comparison',
      },
    ],
    ['Europe', 'Policy', 'Comparison'],
  ),
  createAssignment(
    'ese-06',
    11,
    'ESE',
    'E-Waste Recovery and Hydrometallurgy',
    'A three-part set of material on the hydrometallurgical process, process modifications and an e-waste signature study.',
    [
      {
        name: '01_Hydrometallurgy_Process (1).docx',
        size: 118404,
        type: 'docx',
        label: 'Hydrometallurgy process',
      },
      {
        name: '02_Hydrometallurgy_Modifications (1).docx',
        size: 222152,
        type: 'docx',
        label: 'Process modifications',
      },
      {
        name: '03_Rajasthan_EWaste_Signature (1).docx',
        size: 3018815,
        type: 'docx',
        label: 'E-waste signature study',
      },
    ],
    ['Recovery', 'Hydrometallurgy', 'Process analysis'],
  ),
  createAssignment(
    'extras-01',
    12,
    'Extras',
    'VAEP Explorer',
    'An additional project resource included in the portfolio.',
    [
      {
        name: 'VAEP_EXPLORER (1).pdf',
        size: 491589,
        type: 'pdf',
        label: 'VAEP Explorer document',
      },
    ],
    ['Additional resource'],
  ),
  createAssignment(
    'extras-02',
    13,
    'Extras',
    'E-Waste Case Studies',
    'A collection of case studies on e-waste management.',
    [
      {
        name: 'E-Waste_Case_Studies_Shreyank_Parab_24102B0044.pdf',
        size: 109824,
        type: 'pdf',
        label: 'E-waste case studies report',
      },
    ],
    ['Case studies', 'E-waste'],
  ),
]
