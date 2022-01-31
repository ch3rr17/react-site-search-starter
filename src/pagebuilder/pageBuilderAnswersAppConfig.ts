import AnswersAppConfig from "./models/AnswersAppConfig";

const pageBuilderAnswersAppConfig: AnswersAppConfig = {
  providerConfig: {
    apiKey: '3517add824e992916861b76e456724d9',
    experienceKey: 'answers-js-docs',
    locale: 'en',
    sessionTrackingEnabled: true
  },
  common: {
    style: {
      brandColor: '',
    },
    searchBar: {
      placeholder: 'Search about coffee...'
    },
  },
  universal: {
    label: 'All'
  },
  verticals: {
    faqs: {
      label: 'FAQS',
      path: '/faqs',
      card: 'Standard',
      searchBar: {
        placeholder: 'Search FAQs...'
      },
      standardCard: {
        fieldMappings: {
          description: {
            mappingType: 'FIELD',
            apiName: 'answer'
          }
        }
      }
    },
    events: {
      label: 'Event',
      path: '/events',
      card: 'Standard',
      sorting: [
        {
          type: 'FIELD',
          field: 'name',
          direction: 'DESC'
        }
      ],
      standardCard: {
        fieldMappings: {
          title: {
            mappingType: 'FIELD',
            apiName: 'name'
          },
          description: {
            mappingType: 'FIELD',
            apiName: ['venueName', 'timezone']
          }
        }
      }
    },
    locations: {
      label: 'Locations',
      path: '/locations',
      card: 'Standard'
    },
    jobs: {
      label: 'Jobs',
      path: '/jobs',
      card: 'Standard'
    }
  }
}
export default pageBuilderAnswersAppConfig;