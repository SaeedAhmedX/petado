<template>
  <div class="container-fluid request-container">
    <div class="d-flex justify-content-between mb-5 mt-2">
      <h3>New Request</h3>
    </div>

    <ValidationObserver v-slot="{ handleSubmit }">
      <div class="d-flex flex-column justify-content-left cards-container">
        <div class="card p-3 form-container">
          <div class="mb-3">
            <ValidationProvider
              v-slot="{ errors }"
              name="Complaint Description"
              rules="required"
            >
              <label for="inputFullName" class="form-label"
                >Request Description *</label
              >
              <textarea
                id="inputDescription"
                v-model="complaint.description"
                rows="12"
                class="form-control"
                :class="{ 'is-invalid': errors && errors.length }"
              />
              <p v-if="errors && errors.length" class="invalid-feedback">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </div>
        </div>

        <div
          v-for="(dog, index) in complaint.dogs"
          :key="index"
          class="d-flex justify-content-left"
        >
          <div class="card p-3 form-container">
            <p>Dog #{{ index + 1 }}</p>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Registration Id">
                <label :for="`inputRegistrationId${index}`" class="form-label"
                  >Registration Id</label
                >
                <input
                  :id="`inputRegistrationId${index}`"
                  v-model="dog.registerationId"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Gender"
                rules="required"
              >
                <label :for="`dogGenderGroup${index}`" class="form-label"
                  >Dog Gender *</label
                >
                <div :id="`dogGenderGroup${index}`">
                  <div class="form-check">
                    <input
                      :id="`radioDogGenderMale${index}`"
                      v-model="dog.gender"
                      value="MALE"
                      class="form-check-input"
                      type="radio"
                      :name="`dogGenderGroup${index}`"
                    />
                    <label
                      class="form-check-label"
                      :for="`radioDogGenderMale${index}`"
                    >
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      :id="`radioDogGenderFemale${index}`"
                      v-model="dog.gender"
                      value="FEMALE"
                      class="form-check-input"
                      type="radio"
                      :name="`dogGenderGroup${index}`"
                    />
                    <label
                      class="form-check-label"
                      :for="`radioDogGenderFemale${index}`"
                    >
                      Female
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      :id="`radioDogGenderUnknown${index}`"
                      v-model="dog.gender"
                      value="UNKNOWN"
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                    />
                    <label
                      class="form-check-label"
                      :for="`radioDogGenderUnknown${index}`"
                    >
                      Unknown
                    </label>
                  </div>
                </div>
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Age">
                <label :for="`inputAge${index}`" class="form-label"
                  >Age (In Months)</label
                >
                <input
                  :id="`inputAge${index}`"
                  v-model="dog.age"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Breed">
                <label :for="`inputBreed${index}`" class="form-label"
                  >Breed</label
                >
                <input
                  :id="`inputBreed${index}`"
                  v-model="dog.breed"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Color">
                <label :for="`inputColor${index}`" class="form-label"
                  >Color</label
                >
                <input
                  :id="`inputColor${index}`"
                  v-model="dog.color"
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Dog Description">
                <label :for="`inputDogDescrition${index}`" class="form-label"
                  >Dog Description</label
                >
                <textarea
                  id="`inputDogDescription${index}`"
                  v-model="dog.description"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div class="mb-3">
              <ValidationProvider
                v-slot="{ errors }"
                name="Dog Type"
                rules="required"
              >
                <label :for="`dogType${index}`" class="form-label"
                  >Dog Type *</label
                >
                <div id="`dogType${index}`">
                  <div class="form-check">
                    <input
                      :id="`radioTypeStreet${index}`"
                      v-model="dog.type"
                      value="STREET"
                      class="form-check-input"
                      type="radio"
                      :name="`dogType${index}`"
                    />
                    <label class="form-check-label" for="radioTypeStreet">
                      Street
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      :id="`radioTypePet${index}`"
                      v-model="dog.type"
                      value="PET"
                      class="form-check-input"
                      type="radio"
                      :name="`DogType${index}`"
                    />
                    <label class="form-check-label" for="radioTypePet">
                      Pet
                    </label>
                  </div>
                </div>
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <div v-if="dog.type === 'PET'" class="mb-3">
              <ValidationProvider v-slot="{ errors }" name="Price">
                <label :for="`inputPrice${index}`" class="form-label"
                  >Price</label
                >
                <input
                  :id="`inputPrice${index}`"
                  v-model="dog.price"
                  type="number"
                  class="form-control"
                  :class="{ 'is-invalid': errors && errors.length }"
                />
                <p v-if="errors && errors.length" class="invalid-feedback">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>
          </div>
          <div class="image-container d-inline-flex justify-content-left">
            <UploadImages @changed="(files) => handleImages(files, index)" />
          </div>
        </div>
      </div>
      <div class="action-group">
        <button class="btn btn-primary rounded-pill" @click="addDog">
          + ADD DOG
        </button>
        <button
          class="btn btn-primary rounded-pill"
          @click="handleSubmit(sendRequest)"
        >
          SUBMIT REQUEST
        </button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import UploadImages from 'vue-upload-drop-images';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    UploadImages,
  },
  layout: 'home',
  data() {
    return {
      complaint: {
        description: '',
        dogs: [],
      },
    };
  },
  methods: {
    async sendRequest() {
      if (this.complaint.dogs.length) {
        for (let i = 0; i < this.complaint.dogs.length; i++) {
          if (this.complaint.dogs[i].uploads) {
            const formData = new FormData();
            formData.append('files', this.complaint.dogs[i].uploads);
            for (const file of this.complaint.dogs[i].uploads) {
              formData.append('files', file);
            }
            const result = await this.$axios.post('upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            this.complaint.dogs[i].images = result.data.data;
            delete this.complaint.dogs[i].uploads;
          }
        }
      }
      try {
        await this.$axios.post('dogs/request', this.complaint);
        this.$router.replace({
          path: '/requests',
        });
      } catch (e) {}
    },
    getEmptyDog() {
      return {
        registerationId: '',
        gender: 'UNKNOWN',
        age: '',
        color: '',
        description: '',
        type: 'STREET',
        breed: '',
        price: '',
        images: [],
      };
    },
    addDog() {
      this.complaint.dogs.push(this.getEmptyDog());
    },
    handleImages(files, dogIndex) {
      this.complaint.dogs[dogIndex].uploads = files;
    },
  },
};
</script>

<style scoped lang="scss">
.form-container {
  width: 500px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.request-container {
  .cards-container {
    flex-wrap: wrap;
  }

  .image-container {
    flex-grow: 1;
    flex-wrap: wrap;
    margin-bottom: 20px;

    ::v-deep .clearButton {
      text-transform: uppercase;
    }

    ::v-deep .imageHolder {
      img {
        border: 1px solid rgb(143, 143, 143);
        border-radius: 10px;
      }
    }
  }
  .action-group {
    position: absolute;
    bottom: 20px;
    left: 20px;

    button:not(:last-child) {
      margin-right: 20px !important;
    }
  }
}
</style>
